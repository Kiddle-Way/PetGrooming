import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading....</div>;
const ReviewList = lazy(() => import("../../pages/review/ListPage"));
const ReviewAdd = lazy(() => import("../../pages/review/AddPage"));
const ReviewRead = lazy(() => import("../../pages/review/ReadPage"));
const ReviewModify = lazy(() => import("../../pages/review/ModifyPage"));

const reserveRouter = () => {
  return [
    {
      path: "list",
      element: (
        <Suspense fallback={Loading}>
          <ReviewList />
        </Suspense>
      ),
    },
    {
      path: "",
      element: <Navigate replace to="/review/list" />,
    },
    {
      path: "add",
      element: (
        <Suspense fallback={Loading}>
          <ReviewAdd />
        </Suspense>
      ),
    },
    {
      path: "read/:v_num",
      element: (
        <Suspense fallback={Loading}>
          <ReviewRead />
        </Suspense>
      ),
    },
    {
      path: "modify/:v_num",
      element: (
        <Suspense fallback={Loading}>
          <ReviewModify />
        </Suspense>
      ),
    },
  ];
};
export default reserveRouter;
