import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Alert, Pagination, Space, Tag, Typography } from "antd";
import axios from "axios";
import { EnvironmentOutlined, PhoneOutlined } from "@ant-design/icons";
import RoomCard from "../components/RoomCard";
import CarouselImage from "../components/Carousel";
import Loading from "../components/Loading";

const { Title, Paragraph } = Typography;

export default function AccommodationPage() {
  const { accommodationId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const {
    data: roomData,
    isLoading: roomLoading,
    error: roomError,
  } = useQuery(["rooms", accommodationId], async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/rooms/${accommodationId}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch room details");
    }
  });

  const {
    data: accommodationData,
    isLoading: accommodationLoading,
    error: accommodationError,
  } = useQuery(["accommodation", accommodationId], async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/accommodation/${accommodationId}`
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
    return <Loading />;
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
    <Space direction="vertical" size="middle" style={{ display: "flex" }}>
      <CarouselImage images={accommodationData.images} />
      <Title level={3}>{accommodationData.name}</Title>
      <Paragraph>{accommodationData.description}</Paragraph>
      <Paragraph>
        <EnvironmentOutlined /> {accommodationData.address}
      </Paragraph>
      <Paragraph>
        <PhoneOutlined />  {accommodationData.phoneNumber}
      </Paragraph>
      <Paragraph>
        {accommodationData.amenities.map((amenity, index) => (
          <Tag key={index}>{amenity}</Tag>
        ))}
      </Paragraph>
      <Space direction="vertical" size="middle" style={{ display: "flex" }}>
        {roomData.rooms.map((item) => (
          <RoomCard
            key={item._id}
            room={item}
            accommodationId={accommodationId}
          />
        ))}
      </Space>
      <Pagination
        style={{ marginTop: "16px", textAlign: "right" }}
        current={currentPage}
        total={roomData.total}
        pageSize={pageSize}
        onChange={handlePageChange}
      />
    </Space>
  );
}
