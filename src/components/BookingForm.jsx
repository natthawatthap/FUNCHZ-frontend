import React from "react";
import { Form, Input, Button, DatePicker, Typography } from "antd";

const { Text } = Typography;

const BookingForm = ({
  handleSubmit,
  handleDateChange,
  disabledDate,
  staySummary,
  handleInputChange,
}) => {

    const createBookingMutation = useMutation((formData) => {
        console.log("Booking Form Data:", formData); // Log the formData
        return axios.post(`http://localhost:8080/api/booking`, formData);
      });
    
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
    
      const handleSubmit = async (values) => {
        try {
          const formData = {
            ...values, // Use the form values passed from BookingForm
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
  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      <Form.Item label="Check-in/Check-out Dates">
        <DatePicker.RangePicker
          showTime={{
            format: "HH:mm",
          }}
          format="YYYY-MM-DD HH:mm"
          onChange={handleDateChange}
          disabledDate={disabledDate}
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
  );
};

export default BookingForm;
