import { createBrowserRouter } from "react-router-dom";

import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import AccommodationPage from "./pages/AccommodationPage";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "/accommodation/:id",
        Component: AccommodationPage,
      },
      {
        path: "/accommodation/:accommodationId/room/:roomId",
        Component: BookingPage,
      },
      // {
      //   path: "/404",
      //   Component: NotFoundPage,
      // },
      // {
      //   path: "/500",
      //   Component: ErrorPage,
      // },
      // {
      //   path: "*",
      //   Component: NotFoundPage,
      // },
    ],
  },
  {
    children: [
      {
        path: "/signin",
        Component: SignInPage,
      },
      {
        path: "/signup",
        Component: SignUpPage,
      },
    ],
  },
]);

export default router;
