import React, { useRef } from "react";
import { Carousel, Button, Image } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const CarouselImage = ({ images }) => {
  const carouselRef = useRef(null);

  const handleNext = () => {
    carouselRef.current.next();
  };

  const handlePrev = () => {
    carouselRef.current.prev();
  };

  return (
    <div style={{ position: "relative", textAlign: "center" }}>
      <Carousel autoplay ref={carouselRef}>
        {images.map((image, index) => (
          <Image
            preview={false}
            src={`http://localhost:8080/${image}`}
            alt={`Image ${index}`}
            width={"100%"}
          />
        ))}
      </Carousel>
      <Button
        shape="circle"
        size="large"
        type="text"
        icon={<LeftOutlined />}
        style={{
          marginLeft: "10px",
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",

          backgroundColor: "white",
        }}
        onClick={handlePrev}
      />
      <Button
        shape="circle"
        size="large"
        type="text"
        icon={<RightOutlined />}
        style={{
          marginRight: "10px",
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          backgroundColor: "white",
        }}
        onClick={handleNext}
      />
    </div>
  );
};

export default CarouselImage;
