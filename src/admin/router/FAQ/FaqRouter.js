import { Suspense, lazy } from "react";
import { Navigate } from "react-router";

const Loading = <div>Loading....</div>;
const FaqList = lazy(() => import("../../pages/FAQ/ListPage"));
const FaqAdd = lazy(() => import("../../pages/FAQ/AddPage"));
const FaqModify = lazy(() => import("../../pages/FAQ/ModifyPage"));

const FaqRouter = () => {
  return [
    {
      path: "list",
      element: (
        <Suspense fallback={Loading}>
          <FaqList />
        </Suspense>
      ),
    },
    {
      path: "",
      element: <Navigate replace to="list" />,
    },
    {
      path: "add",
      element: (
        <Suspense fallback={Loading}>
          <FaqAdd />
        </Suspense>
      ),
    },
    {
      path: "modify/:f_num",
      element: (
        <Suspense fallback={Loading}>
          <FaqModify />
        </Suspense>
      ),
    },
  ];
};

export default FaqRouter;
