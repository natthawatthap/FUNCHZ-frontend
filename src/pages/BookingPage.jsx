import React, { useState } from "react";
import { DatePicker, Form, Input, Button, Typography } from "antd";
import { useParams } from "react-router-dom";
const { Text } = Typography;

const Booking = () => {
  const { id } = useParams();
  const [bookingInfo, setBookingInfo] = useState({
    checkinDate: null,
    checkoutDate: null,
    name: "",
    phoneNumber: "",
    email: "",
  });

  const [staySummary, setStaySummary] = useState("");

  const handleDateChange = (dates) => {
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

  const handleSubmit = (e) => {
  
    // Handle form submission here
    console.log("Booking Info:", bookingInfo);
  };

  

  return (
    <div>
      <h1>Book Your Stay</h1>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Check-in/Check-out Dates">
          <DatePicker.RangePicker
            showTime={{
              format: "HH:mm",
            }}
            format="YYYY-MM-DD HH:mm"
            onChange={handleDateChange}
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
