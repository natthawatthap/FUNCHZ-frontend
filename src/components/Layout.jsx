import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { Layout, Button, Image, Space } from "antd";
const { Header, Content, Footer } = Layout;

export default function BaseLayout() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track authentication

  useEffect(() => {
    // Check if token exists in localStorage to determine authentication status
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogin = () => {
    navigate("/signin");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    setIsLoggedIn(false); // Update authentication state
    navigate("/"); // Redirect to home page or wherever needed
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ backgroundColor: "#f0f2f5", padding: "0 16px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "0 auto",
          }}
        >
          <Link to={"/"}>
            <Image src="logo.svg" preview={false} />
          </Link>
          <Space>
            {/* Conditionally render login and signup buttons based on authentication status */}
            {isLoggedIn ? (
              <Button onClick={handleLogout}>Logout</Button>
            ) : (
              <>
                <Button onClick={handleLogin}>Login</Button>
                <Button type="primary" onClick={handleSignup}>
                  Register
                </Button>
              </>
            )}
          </Space>
        </div>
      </Header>
      <Content
        style={{
          padding: "0 16px",
        }}
      >
        <div
          style={{
            margin: "16px 0",
            background: "#fff",
            padding: 24,
            borderRadius: 12,
          }}
        >
          <Outlet />
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
          background: "#f0f2f5",
        }}
      >
        FUNCH ©{new Date().getFullYear()} Created by Natthawat
      </Footer>
    </Layout>
  );
}
