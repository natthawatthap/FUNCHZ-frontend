import React, { useState } from "react";
import { Form, Input, Button, DatePicker, Typography } from "antd";
import { useMutation } from "react-query";
import axios from "axios";
import moment from "moment";

const { Text } = Typography;

export default function BookingForm({
  userId,
  accommodationId,
  roomId,
  bookings,
  pricePerNight,
}) {
  const [bookingInfo, setBookingInfo] = useState({
    userId,
    accommodationId,
    roomId,
    checkinDate: null,
    checkoutDate: null,
    name: "",
    phoneNumber: "",
    email: "",
  });

  const [staySummary, setStaySummary] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  const createBookingMutation = useMutation((formData) => {
    return axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/booking`, formData);
  });

  const handleDateChange = (dates) => {
    if (!dates || dates.length !== 2) {
      // Dates are not provided or invalid
      return;
    }

    const [checkinDate, checkoutDate] = dates.map((date) => date.toISOString()); // Convert dates to ISO string
    setBookingInfo({ ...bookingInfo, checkinDate, checkoutDate });

    // Calculate the stay duration
    const stayDuration = calculateStayDuration(checkinDate, checkoutDate);
    setStaySummary(stayDuration);

    // Calculate total price
    const totalPrice = calculatePrice(checkinDate, checkoutDate);
    setTotalPrice(totalPrice);
  };

  const calculatePrice = (checkinDate, checkoutDate) => {
    const diffInHours = moment(checkoutDate).diff(checkinDate, "hours");
    const nights = Math.ceil(diffInHours / 24);
    const totalPrice = pricePerNight * nights;
    return totalPrice;
  };

  const calculateStayDuration = (checkinDate, checkoutDate) => {
    if (checkinDate && checkoutDate) {
      const diffInDays = moment(checkoutDate).diff(checkinDate, "days");
      const diffInNights = diffInDays - 1;
      return { days: diffInDays, nights: diffInNights };
    }
    return { days: 0, nights: 0 };
  };

  const disabledDate = (current) => {
    // Get today's date
    const today = new Date();
    // Disable dates that fall within the existing bookings
    return (
      current &&
      (current < today ||
        bookings.some((booking) => {
          const startDate = new Date(booking.checkinDate);
          const endDate = new Date(booking.checkoutDate);
          return current >= startDate && current <= endDate;
        }))
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingInfo({ ...bookingInfo, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      console.log(bookingInfo);

      await createBookingMutation.mutateAsync(bookingInfo);
      // Handle successful booking
      console.log("Booking successful");
    } catch (error) {
      // Handle booking error
      console.error("Error creating booking:", error);
    }
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      <Form.Item label="Check-in / Check-out Dates">
        <DatePicker.RangePicker
          showTime={{
            format: "HH:mm",
          }}
          format="YYYY-MM-DD HH:mm"
          onChange={handleDateChange}
          disabledDate={disabledDate}
        />
      </Form.Item>

      {staySummary && (
        <Form.Item label="Stay Duration">
          <Text type="secondary">
            {staySummary.days} days, {staySummary.nights} nights
          </Text>
        </Form.Item>
      )}

      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please enter your name" }]}
      >
        <Input name="name" onChange={handleInputChange} />
      </Form.Item>
      <Form.Item
        label="Phone Number"
        name="phoneNumber"
        rules={[{ required: true, message: "Please enter your phone number" }]}
      >
        <Input name="phoneNumber" onChange={handleInputChange} />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please enter your email" },
          { type: "email", message: "Please enter a valid email" },
        ]}
      >
        <Input name="email" onChange={handleInputChange} />
      </Form.Item>

      {totalPrice !== 0 && (
        <Form.Item label="Total Price">
          <Text>{`$${totalPrice}`}</Text>
        </Form.Item>
      )}

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Book Now
        </Button>
      </Form.Item>
    </Form>
  );
}
