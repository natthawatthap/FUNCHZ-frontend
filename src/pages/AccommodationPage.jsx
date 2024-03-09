import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Spin, Alert, List, Pagination, Space, Row, Col, Typography } from "antd";
import axios from "axios";
import RoomCard from "../components/RoomCard";
import CarouselImage from "../components/Carousel";

const { Title, Paragraph } = Typography;

const AccommodationPage = () => {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const {
    data: roomData,
    isLoading: roomLoading,
    error: roomError,
  } = useQuery(["rooms", id], async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/rooms/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch room details");
    }
  });

  const {
    data: accommodationData,
    isLoading: accommodationLoading,
    error: accommodationError,
  } = useQuery(["accommodation", id], async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/accommodation/${id}`
      );
      return response.data.accommodation;
    } catch (error) {
      throw new Error("Failed to fetch accommodation details");
    }
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (roomLoading || accommodationLoading) {
    return <Spin size="large" />;
  }

  if (roomError || accommodationError) {
    return (
      <Alert
        message="Error"
        description="Failed to fetch details"
        type="error"
      />
    );
  }

  return (
    <div>
      <CarouselImage images={accommodationData.images} />
      <Title level={3}>{accommodationData.name}</Title>
      <Paragraph>Description: {accommodationData.description}</Paragraph>
      <Paragraph>Address: {accommodationData.address}</Paragraph>
      <Paragraph>Phone Number: {accommodationData.phoneNumber}</Paragraph>
      <Space direction="vertical" size="middle" style={{ display: "flex" }}>
        {roomData.rooms.map((item) => (
          <RoomCard key={item._id} room={item} accommodationId={id} />
        ))}
      </Space>
      <Pagination
        style={{ marginTop: "16px", textAlign: "center" }}
        current={currentPage}
        total={roomData.total}
        pageSize={pageSize}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default AccommodationPage;
