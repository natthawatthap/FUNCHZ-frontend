import React from "react";
import { Form, Input, Button, Row, Col } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

const SignUpPage = () => {
  const navigate = useNavigate();
  const signup = async (formData) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/user/signup`, formData);
      // Handle successful signup
      console.log("Signup successful:", response.data);
      navigate("/login");
    } catch (error) {
      // Handle error
      console.error("Error during signup:", error);
    }
  };

  const { mutate, isLoading } = useMutation(signup);

  const onFinish = (values) => {
    mutate(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row justify="center">
      <Col xs={24} sm={20} md={16} lg={12} xl={8}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1>Sign Up</h1>
        </div>
        <Form
          name="signup"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            rules={[
              { required: true, message: "Please enter your phone number" },
              {
                pattern: /^[0-9]{10}$/,
                message: "Please enter a valid phone number",
              },
            ]}
          >
            <Input placeholder="Phone Number" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%" }}
              loading={isLoading}
            >
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default SignUpPage;
