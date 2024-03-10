import { theme } from "antd";

const customTheme = {
  ...theme,
  token: {
    colorPrimary: "#1890ff", 
    borderRadius: 4, 
  },
  components: {
    Button: {
      colorPrimary: "#1890ff", 
    },
    Layout: {
      headerBg: "#f0f2f5", 
      headerColor: "#333", 
    },
  },
};

export default customTheme;
