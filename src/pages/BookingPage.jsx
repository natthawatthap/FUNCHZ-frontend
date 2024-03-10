import React, { useEffect, useState } from "react";
import { Alert, Space, Card } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { jwtDecode } from "jwt-decode";
import CarouselImage from "../components/Carousel";
import RoomDetail from "../components/RoomDetail";
import axios from "axios";
import Loading from "../components/Loading";
import BookingForm from "../components/BookingForm";

const Booking = () => {
  const { accommodationId, roomId } = useParams();
  const navigate = useNavigate();

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      localStorage.setItem('redirect',`/accommodation/${accommodationId}/room/${roomId}`);
      navigate("/signin");
    } else {
      const decodedToken = jwtDecode(token); // Decode the token
      if (decodedToken.userId) {
        setUserId(decodedToken.userId); // Set the user ID from the decoded token
      }
    }
  }, [navigate]);

  const {
    data: room,
    isLoading: roomLoading,
    error: roomError,
  } = useQuery(["room", roomId], async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/room/${roomId}`
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
        `${import.meta.env.VITE_API_BASE_URL}/api/booking/${roomId}`
      );
      console.log(response.data);
      return response.data.bookings;
    } catch (error) {
      throw new Error("Failed to fetch bookings");
    }
  });

  if (roomLoading || bookingsLoading) {
    return <Loading />;
  }

  if (roomError || bookingsError) {
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
