import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Card, message, Typography } from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  LockOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

const { Title } = Typography;

const SignUpPage = () => {
  const navigate = useNavigate();

  const signUpMutation = useMutation(async (formData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/signup`,
        formData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response.data.message || "An error occurred during sign-in"
      );
    }
  });

  const onFinish = async (values) => {
    await signUpMutation.mutate(values, {
      onSuccess: () => {
        message.success("Sign up successful");
        navigate("/signin");
      },
      onError: (error) => {
        console.error("Login failed:", error);
        message.error(error.message || "Sign up failed");
      },
    });
  };

  return (
    <Row justify="center" style={{ marginTop: "100px" }}>
      <Col xs={24} sm={20} md={16} lg={12} xl={8}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Title level={2}>Sign Up</Title>
        </div>
        <Card bordered={false}>
          <Form
            name="signup"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input placeholder="Name" prefix={<UserOutlined />} />
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
              <Input placeholder="Phone Number" prefix={<PhoneOutlined />} />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input placeholder="Email" prefix={<MailOutlined />} />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input.Password
                placeholder="Password"
                prefix={<LockOutlined />}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
                loading={signUpMutation.isLoading}
              >
                Sign Up
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default SignUpPage;
