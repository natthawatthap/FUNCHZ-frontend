import { theme } from "antd";

const customTheme = {
  ...theme,
  token: {
    colorPrimary: "#1890ff", // Primary color for buttons, links, etc.
    borderRadius: 4, // Border radius for components
  },
  components: {
    Button: {
      colorPrimary: "#1890ff", // Color for primary buttons
    },
    Layout: {
      headerBg: "#f0f2f5", // Background color for the header
      headerColor: "#333", // Text color for the header
    },
  },
};

export default customTheme;
