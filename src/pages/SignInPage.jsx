import React from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import axios from "axios";

const SignInPage = () => {
  const navigate = useNavigate();

  const signInMutation = useMutation(async (formData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/signin`,
        formData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response.data.message || "An error occurred during sign-in"
      );
    }
  });

  const onFinish = (values) => {
    signInMutation.mutate(values, {
      onSuccess: () => {
        // Redirect to dashboard or some other page upon successful login
        navigate("/");
      },
      onError: (error) => {
        console.error("Login failed:", error);
        // Handle login error
      },
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row justify="center" style={{ marginTop: "100px" }}>
      <Col xs={24} sm={20} md={16} lg={12} xl={8}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1>Login</h1>
        </div>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
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
              loading={signInMutation.isLoading}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default SignInPage;
