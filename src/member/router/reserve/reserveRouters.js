import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const reserveRouter = () => {
  const Loading = <div>Loading....</div>;
  const ReservePage = lazy(() => import("../../pages/reserve/ReservePage"));
  const ReserveMore = lazy(() => import("../../pages/reserve/ReserveMore"));
  const Success = lazy(() => import("../../pages/reserve/Success"));
  const Fail = lazy(() => import("../../pages/reserve/Fail"));

  return [
    {
      path: "page",
      element: (
        <Suspense fallback={Loading}>
          <ReservePage />
        </Suspense>
      ),
    },
    {
      path: "",
      element: <Navigate replace to="/reserve/page" />,
    },
    {
      path: "page/more",
      element: (
        <Suspense fallback={Loading}>
          <ReserveMore />
        </Suspense>
      ),
    },
    {
      path: "success",
      element: (
        <Suspense fallback={Loading}>
          <Success />
        </Suspense>
      ),
    },
    {
      path: "fail",
      element: (
        <Suspense fallback={Loading}>
          <Fail />
        </Suspense>
      ),
    },
  ];
};
export default reserveRouter;
