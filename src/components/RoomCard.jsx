import React from "react";
import { Card, Carousel, Col, Row, Typography, Tag } from "antd";

import { useNavigate } from "react-router-dom";
import CarouselImage from "./Carousel";
import RoomDetail from "./RoomDetail";
const { Title, Paragraph } = Typography;
export default function RoomCard({ room, accommodationId }) {
  const navigate = useNavigate();

  const handleClick = (roomId) => {
    navigate(`/accommodation/${accommodationId}/room/${roomId}`);
  };

  return (
    <Card>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <CarouselImage images={room.images} />
        </Col>
        <Col xs={24} sm={12} onClick={() => handleClick(room._id)} style={{ cursor: "pointer" }}>
        <RoomDetail room={room} />
        </Col>
      </Row>
    </Card>
  );
}
