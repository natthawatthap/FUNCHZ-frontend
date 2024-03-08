import { useState } from "react";
import {
  Input,
  DatePicker,
  Space,
  Card,
  Row,
  Col,
  Pagination,
  Button,
  Carousel,
  List,
} from "antd";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
const { Search } = Input;
const { RangePicker } = DatePicker;

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2; // Number of cards per page

  const { data, isLoading, error } = useQuery("accommodations", async () => {
    const response = await fetch(
      "http://localhost:8080/api/accommodation?page=1&limit=10&sortBy=name&sortOrder=asc"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch accommodations");
    }
    return response.json();
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
    

      {data && (
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: setCurrentPage,
            pageSize: pageSize,
            current: currentPage,
            total: data.total,
          }}
          dataSource={data.accommodations}
          renderItem={(accommodation) => (
            <List.Item
              key={accommodation._id}
              actions={[
                <Space>
                  <Link to={`/booking/${accommodation._id}`}>Book</Link>
                </Space>,
              ]}
              extra={
                <div style={{ width: 272 }}>
                  <Carousel autoplay>
                    {accommodation.images.map((image, index) => (
                      <div key={index}>
                        <img
                          src={`http://localhost:8080/${image}`}
                          alt={`Image ${index}`}
                          style={{ width: "100%" }}
                        />
                      </div>
                    ))}
                  </Carousel>
                </div>
              }
            >
              <List.Item.Meta
                title={
                  <Link to={`/booking/${accommodation._id}`}>
                    {accommodation.name}
                  </Link>
                }
                description={accommodation.description}
              />
              <p>Address: {accommodation.address}</p>
              <p>Phone: {accommodation.phoneNumber}</p>
            </List.Item>
          )}
        />
      )}
   
    </div>
  );
};

export default Home;
