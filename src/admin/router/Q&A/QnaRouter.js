import { Suspense, lazy } from "react";
import { Navigate } from "react-router";

const Loading = <div>Loading....</div>;
const QnaList = lazy(() => import("../../pages/Q&A/ListPage"));
const QnaAdd = lazy(() => import("../../pages/Q&A/AddPage"));
const QnaModify = lazy(() => import("../../pages/Q&A/ModifyPage"));

const QnaRouter = () => {
  return [
    {
      path: "list",
      element: (
        <Suspense fallback={Loading}>
          <QnaList />
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
          <QnaAdd />
        </Suspense>
      ),
    },
    {
      path: "modify/:f_num",
      element: (
        <Suspense fallback={Loading}>
          <QnaModify />
        </Suspense>
      ),
    },
  ];
};

export default QnaRouter;
