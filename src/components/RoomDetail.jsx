import { Typography, Tag } from "antd";

const { Title, Paragraph } = Typography;

const RoomDetail = ({ room }) => {
  return (
    <>
      <Title level={2}>{room.name}</Title>
      <Paragraph>{room.description}</Paragraph>
      <Paragraph>Type: {room.type}</Paragraph>
      <Paragraph>Price Per Night: ${room.pricePerNight}</Paragraph>
      <Paragraph>
        {room.amenities.map((amenity, index) => (
          <Tag key={index}>{amenity}</Tag>
        ))}
      </Paragraph>
    </>
  );
};

export default RoomDetail;
