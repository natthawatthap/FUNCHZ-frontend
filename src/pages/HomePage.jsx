import { useState } from "react";
import { Space, Row, Col, Pagination, Alert } from "antd";
import { useQuery } from "react-query";
import AccommodationCard from "../components/AccommodationCard";
import Loading from "../components/Loading";
import axios from "axios"; // Import axios

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading, error } = useQuery(
    ["accommodations", currentPage, pageSize],
    async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/accommodations?page=${currentPage}&limit=${pageSize}&sortBy=name&sortOrder=asc`
        );
        return response.data;
      } catch (error) {
        throw new Error("Failed to fetch accommodations");
      }
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
    return <Loading />;
  }

  if (error) {
    return <Alert message="Error" description={error.message} type="error" />;
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
        <div style={{ textAlign: "right" }}>
          <Pagination
            current={currentPage}
            total={data.total}
            pageSize={pageSize}
            onChange={handlePageChange}
            pageSizeOptions={["10", "20", "30", "40"]} // Define available page sizes
            showSizeChanger // Display size changer dropdown
            onShowSizeChange={handlePageSizeChange} // Handle page size change event
          />
        </div>
      </Space>
    );
  }
}
