import React from "react";
import { Alert, Space, Card } from "antd";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import CarouselImage from "../components/Carousel";
import RoomDetail from "../components/RoomDetail";
import axios from "axios";
import Loading from "../components/Loading";
import BookingForm from "../components/BookingForm";

const Booking = () => {
  const { accommodationId, roomId } = useParams();
  const userId = "65eccc09afb5f002dc5aa3fd";

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

  if (roomLoading||bookingsLoading) {
    return <Loading />;
  }

  if (roomError||bookingsError) {
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
          userId={userId}
          accommodationId={accommodationId}
          roomId={roomId}
          bookings={bookings}
          pricePerNight={room.pricePerNight}
        />
      </Card>
    </Space>
  );
};

export default Booking;
