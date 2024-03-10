import React from "react";
import { Form, Input, Button, Row, Col, Typography, Card,message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import axios from "axios";

const { Title } = Typography;

const SignInPage = () => {
  const navigate = useNavigate();

  const signInMutation = useMutation(async (formData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/signin`,
        formData
      );
      console.log(response.data);
      const token = response.data.token; // Assuming the token is returned in the response data
      saveTokenToLocalStorage(token);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response.data.message || "An error occurred during sign-in"
      );
    }
  });

  const saveTokenToLocalStorage = (token) => {
    localStorage.setItem('token', token);
  };

  const onFinish = (values) => {
    signInMutation.mutate(values, {
      onSuccess: () => {
        message.success("Sign in successful");
        const redirect = localStorage.getItem("redirect");
        localStorage.removeItem("redirect"); 
        navigate(redirect || "/"); 
  
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
          <Title level={2}>Sign In</Title>
        </div>
        <Card bordered={false}>
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
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
                prefix={<LockOutlined />}
                placeholder="Password"
              />
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
        </Card>
      </Col>
    </Row>
  );
};

export default SignInPage;
