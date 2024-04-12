import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading....</div>;
const InquiryList = lazy(() => import("../../pages/inquiry/ListPage"));
const InquiryAdd = lazy(() => import("../../pages/inquiry/AddPage"));
const InquiryRead = lazy(() => import("../../pages/inquiry/ReadPage"));
const InquiryModify = lazy(() => import("../../pages/inquiry/ModifyPage"));

const inquiryRouter = () => {
  return [
    {
      path: "list",
      element: (
        <Suspense fallback={Loading}>
          <InquiryList />
        </Suspense>
      ),
    },
    {
      path: "",
      element: <Navigate replace to="/inquiry/list" />,
    },
    {
      path: "add",
      element: (
        <Suspense fallback={Loading}>
          <InquiryAdd />
        </Suspense>
      ),
    },
    {
      path: "read/:i_num",
      element: (
        <Suspense fallback={Loading}>
          <InquiryRead />
        </Suspense>
      ),
    },
    {
      path: "modify/:i_num",
      element: (
        <Suspense fallback={Loading}>
          <InquiryModify />
        </Suspense>
      ),
    },
  ];
};
export default inquiryRouter;
