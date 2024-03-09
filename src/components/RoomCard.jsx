import React from "react";
import { Card, Carousel, Col, Row } from "antd";
import { Link } from "react-router-dom";

const RoomCard = ({ room,accommodationId }) => {
  return (
    <Card>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Carousel autoplay>
            {room.images.map((image, index) => (
              <div key={index}>
                <img
                  src={`http://localhost:8080/${image}`}
                  alt={`Image ${index}`}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            ))}
          </Carousel>
        </Col>
        <Col xs={24} sm={12}>
          <div>
            <h2>{room.name}</h2>
            <p>Description: {room.description}</p>
            <p>Type: {room.type}</p>
            <p>Price Per Night: ${room.pricePerNight}</p>
            <p>Amenities: {room.amenities.join(", ")}</p>
            <Link to={`/accommodation/${accommodationId}/room/${room._id}`}>Book</Link>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default RoomCard;
