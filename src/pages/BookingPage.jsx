import React, { useState } from "react";
import { DatePicker, Form, Input, Button, Typography, Spin, Alert } from "antd";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import axios from "axios";

const { Text } = Typography;

const Booking = () => {
  const { accommodationId, roomId } = useParams();
  const [bookingInfo, setBookingInfo] = useState({
    userId: "65eccc09afb5f002dc5aa3fd",
    accommodationId: accommodationId,
    roomId: roomId,
    checkinDate: null,
    checkoutDate: null,
    name: "",
    phoneNumber: "",
    email: "",
  });

  const [staySummary, setStaySummary] = useState("");

  const handleDateChange = (dates) => {
    if (!dates || dates.length !== 2) {
      // Dates are not provided or invalid
      return;
    }

    const [checkinDate, checkoutDate] = dates;
    setBookingInfo({ ...bookingInfo, checkinDate, checkoutDate });

    // Calculate the difference between check-in and check-out dates
    if (checkinDate && checkoutDate) {
      const diffInDays = Math.ceil(
        (checkoutDate - checkinDate) / (1000 * 60 * 60 * 24)
      );
      const diffInNights = diffInDays - 1; // Assuming a day starts from check-in and ends on the night before checkout
      setStaySummary(
        `Stay Duration: ${diffInDays} days, ${diffInNights} nights`
      );
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingInfo({ ...bookingInfo, [name]: value });
  };

  const {
    data: bookings = [],
    isLoading: bookingsLoading,
    error: bookingsError,
  } = useQuery(["bookings", roomId], async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/booking/${roomId}`
      );
      console.log(response.data);
      return response.data.bookings;
    } catch (error) {
      throw new Error("Failed to fetch bookings");
    }
  });

  const createBookingMutation = useMutation((formData) => {
    console.log("Booking Form Data:", formData); // Log the formData
    return axios.post(`http://localhost:8080/api/booking`, formData);
  });

  const {
    data: room,
    isLoading: roomLoading,
    error: roomError,
  } = useQuery(["room", roomId], async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/room/${roomId}`
      );
      return response.data.room;
    } catch (error) {
      throw new Error("Failed to fetch room details");
    }
  });

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

  const handleSubmit = async () => {
    try {

      const formData = {
        ...bookingInfo,
        checkinDate: bookingInfo.checkinDate.toISOString(), // Convert to ISO string
        checkoutDate: bookingInfo.checkoutDate.toISOString(), // Convert to ISO string
      };
      await createBookingMutation.mutateAsync(formData);
      // Handle successful booking
      console.log("Booking successful");
    } catch (error) {
      // Handle booking error
      console.error("Error creating booking:", error);
    }
  };

  if (roomLoading) {
    return <Spin size="large" />;
  }

  if (roomError) {
    return (
      <Alert message="Error" description={roomError.message} type="error" />
    );
  }

  return (
    <div>
      <h1>Book Your Stay</h1>
      <div>
        <h2>{room.name}</h2>
        <p>Description: {room.description}</p>
        <p>Type: {room.type}</p>
        <p>Price Per Night: ${room.pricePerNight}</p>
        <p>Amenities: {room.amenities.join(", ")}</p>
        <div>
          <h3>Images</h3>
          {room.images.map((image, index) => (
            <img
              key={index}
              src={`http://localhost:8080/${image}`}
              alt={`Image ${index}`}
              style={{ width: "100%", height: "auto" }}
            />
          ))}
        </div>
      </div>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Check-in/Check-out Dates">
          <DatePicker.RangePicker
            showTime={{
              format: "HH:mm",
            }}
            format="YYYY-MM-DD HH:mm"
            onChange={handleDateChange}
            disabledDate={disabledDate} // Disable dates based on availability
          />
          {staySummary && <Text type="secondary">{staySummary}</Text>}
        </Form.Item>
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
          rules={[
            { required: true, message: "Please enter your phone number" },
          ]}
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
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Book Now
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Booking;
