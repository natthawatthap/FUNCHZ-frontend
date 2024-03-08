import { theme } from "antd";
const customTheme = {
  ...theme,
  token: {
    colorPrimary: "#4a5c6c",
    borderRadius: 8,
  },
  components: {
    Button: {
      colorPrimary: "#4a5c6c",
      algorithm: "algorithm",
    },
    // Layout: {
    //   headerBg: "#285074", // Customize the background color of the header
    //   headerColor: "rgba(194, 122, 122, 0.88)", // Customize the text color of the header
    // },
  },
};

export default customTheme;
