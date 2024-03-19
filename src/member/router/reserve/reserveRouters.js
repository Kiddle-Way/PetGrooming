import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const reserveRouter = () => {
  const Loading = <div>Loading....</div>;
  const ReservePage = lazy(() => import("../../pages/reserve/ReservePage"));
  const ReserveMore = lazy(() => import("../../pages/reserve/ReserveMore"));

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
  ];
};
export default reserveRouter;
