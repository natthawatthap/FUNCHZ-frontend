import React, { useState } from "react";
import {
  DatePicker,
  Form,
  Input,
  Button,
  Typography,
  Alert,
  Space,
  Card,
} from "antd";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import CarouselImage from "../components/Carousel";
import RoomDetail from "../components/RoomDetail";
import axios from "axios";
import Loading from "../components/Loading";
import BookingForm from "../components/BookingForm";

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
    return <Loading />;
  }

  if (roomError) {
    return (
      <Alert message="Error" description={roomError.message} type="error" />
    );
  }

  return (
    <Space direction="vertical" size="middle" style={{ display: "flex" }}>
      <CarouselImage images={room.images} />
      <RoomDetail room={room} />
      <Card>
        <BookingForm
          handleSubmit={handleSubmit}
          handleDateChange={handleDateChange}
          disabledDate={disabledDate}
          staySummary={staySummary}
          handleInputChange={handleInputChange}
        />
      </Card>
    </Space>
  );
};

export default Booking;
