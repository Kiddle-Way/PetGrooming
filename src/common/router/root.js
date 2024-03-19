import { Suspense, lazy } from "react";
import inquiryRouter from "../../member/router/inquiry/inquiryRouter";

const { createBrowserRouter } = require("react-router-dom");

const Loading = <div>Loading....</div>;
const Main = lazy(() => import("../../member/pages/main/MainPage"));
const About = lazy(() => import("../../member/pages/main/AboutPage"));
const Inquiry = lazy(() => import("../../member/pages/inquiry/IndexPage"));
const Join = lazy(() => import("../../member/pages/member/JoinPage"));
const Login = lazy(() => import("../../member/pages/member/LoginPage"));
const MyPage = lazy(() => import("../../member/pages/member/MyPage"));

const root = createBrowserRouter([
  {
    path: "",
    element: (
      <Suspense fallback={Loading}>
        <Main />
      </Suspense>
    ),
  },
  {
    path: "about",
    element: (
      <Suspense fallback={Loading}>
        <About />
      </Suspense>
    ),
  },
  {
    path: "inquiry",
    element: (
      <Suspense fallback={Loading}>
        <Inquiry />
      </Suspense>
    ),
    children: inquiryRouter(),
  },
  {
    path: "join",
    element: (
      <Suspense fallback={Loading}>
        <Join />
      </Suspense>
    ),
  },
  {
    path: "login",
    element: (
      <Suspense fallback={Loading}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "myPage",
    element: (
      <Suspense fallback={Loading}>
        <MyPage />
      </Suspense>
    )
  }
]);

export default root;
