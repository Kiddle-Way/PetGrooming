import { Suspense, lazy } from "react";
const Loading = <div>Loading....</div>;
const LoginPage = lazy(() => import("../../pages/member/LoginPage"));
const LogoutPage = lazy(() => import("../../pages/member/LogoutPage"));
const JoinPage = lazy(() => import("../../pages/member/JoinPage"));
const MyPage = lazy(() => import("../../pages/member/MyPage"));
const MyReservationPage = lazy(() =>
  import("../../pages/member/MyReservationPage")
);
const MemberList = lazy(() => import("../../../admin/pages/member/ListPage"));
const MemberList2 = lazy(() => import("../../../admin/pages/member/ListPage2"));

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
    {
      path: "myreservation",
      element: (
        <Suspense fallback={Loading}>
          <MyReservationPage />
        </Suspense>
      ),
    },
    {
      path: "list",
      element: (
        <Suspense fallback={Loading}>
          <MemberList />
        </Suspense>
      ),
    },
    {
      path: "retire",
      element: (
        <Suspense fallback={Loading}>
          <MemberList2 />
        </Suspense>
      ),
    },
  ];
};

export default memberRouter;
