import { Card, Carousel, Image, Row, Col, Tag, Typography } from "antd";
import { EnvironmentOutlined, PhoneOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const { Title, Paragraph } = Typography;

const AccommodationCard = ({ accommodation }) => {
  const navigate = useNavigate();

  const handleClick = (accommodationId) => {
    navigate(`/Accommodation/${accommodationId}`);
  };

  return (
    <Card
      bordered={false}
      className="hoverable-card"
      onClick={() => handleClick(accommodation._id)}
    >
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Carousel autoplay>
            {accommodation.images.map((image, index) => (
              <Image
                key={index}
                src={`http://localhost:8080/${image}`}
                alt={`Image ${index}`}
                preview={false}
                style={{ objectFit: "cover", height: "100px" }}
              />
            ))}
          </Carousel>
        </Col>
        <Col span={12}>
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
};

export default AccommodationCard;
