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
  Image,
} from "antd";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import AccommodationCard from "../components/AccommodationCard";
const { Search } = Input;
const { RangePicker } = DatePicker;

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading, error } = useQuery(
    ["accommodations", currentPage, pageSize],
    async () => {
      const response = await fetch(
        `http://localhost:8080/api/accommodations?page=${currentPage}&limit=${pageSize}&sortBy=name&sortOrder=asc`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch accommodations");
      }
      return response.json();
    }
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (current, size) => {
    setPageSize(size);
    setCurrentPage(1); // Reset current page when changing page size
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (data) {
    return (
      <Space direction="vertical" size="middle" style={{ display: "flex" }}>
        <Row gutter={[16, 16]}>
          {data.accommodations.map((accommodation, index) => (
            <Col span={24} key={index}>
              <AccommodationCard accommodation={accommodation} />
            </Col>
          ))}
        </Row>
        <Pagination
          current={currentPage}
          total={data.total}
          pageSize={pageSize}
          onChange={handlePageChange}
          pageSizeOptions={["10", "20", "30", "40"]} // Define available page sizes
          showSizeChanger // Display size changer dropdown
          onShowSizeChange={handlePageSizeChange} // Handle page size change event
        />
      </Space>
    );
  }
};

export default Home;
