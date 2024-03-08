import { Outlet, useNavigate, Link } from "react-router-dom";
import { Breadcrumb, Layout, Menu, theme, Button, Image, Space } from "antd";
const { Header, Content, Footer } = Layout;

const BaseLayout = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/signin");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <Link to={"/"}>
            <Image src="logo.svg" preview={false} />
          </Link>
          <Space>
            <Button onClick={handleLogin}>เข้าสู่ระบบ</Button>
            <Button type="primary" onClick={handleSignup}>
              สมัครสมาชิค
            </Button>
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
            background: "#9d9a9a",
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
          background: "#c9acac",
        }}
      >
        FUNCH ©{new Date().getFullYear()} Created by Natthawat
      </Footer>
    </Layout>
  );
};

export default BaseLayout;
