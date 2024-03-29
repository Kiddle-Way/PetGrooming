import { Suspense, lazy } from "react";
const Loading = <div>Loading....</div>;
const LoginPage = lazy(() => import("../../pages/member/LoginPage"));
const LogoutPage = lazy(() => import("../../pages/member/LogoutPage"));
const JoinPage = lazy(() => import("../../pages/member/JoinPage"));
const MyPage = lazy(() => import("../../pages/member/MyPage"));

const memberRouter = () => {
  return [
    {
      path: "login",
      element: (
        <Suspense fallback={Loading}>
          <LoginPage />
        </Suspense>
      ),
    },
    {
      path: "logout",
      element: (
        <Suspense fallback={Loading}>
          <LogoutPage />
        </Suspense>
      ),
    },
    {
      path: "join",
      element: (
        <Suspense fallback={Loading}>
          <JoinPage />
        </Suspense>
      ),
    },
    {
      path: "mypage",
      element: (
        <Suspense fallback={Loading}>
          <MyPage />
        </Suspense>
      ),
    },
  ];
};

export default memberRouter;