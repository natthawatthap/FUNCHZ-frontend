import { Card, Carousel, Image, Row, Col, Tag, Typography } from "antd";
import { EnvironmentOutlined, PhoneOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import CarouselImage from "./Carousel";
const { Title, Paragraph } = Typography;

export default function AccommodationCard({ accommodation }) {
  const navigate = useNavigate();

  const handleClick = (accommodationId) => {
    navigate(`/accommodation/${accommodationId}`);
  };

  return (
    <Card bordered={false}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <CarouselImage images={accommodation.images} />
        </Col>
        <Col xs={24} sm={12} onClick={() => handleClick(accommodation._id)} style={{ cursor: "pointer" }}>
          <Title level={2}>{accommodation.name}</Title>
          <Paragraph>{accommodation.description}</Paragraph>
          <Paragraph>
            <EnvironmentOutlined /> {accommodation.address}
          </Paragraph>
          <Paragraph>
            <PhoneOutlined /> {accommodation.phoneNumber}
          </Paragraph>
          <Paragraph>
            {accommodation.amenities.map((amenity, index) => (
              <Tag key={index}>{amenity}</Tag>
            ))}
          </Paragraph>
        </Col>
      </Row>
    </Card>
  );
}
