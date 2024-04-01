import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading....</div>;
const NoticeList = lazy(() => import("../../pages/notice/ListPage"));
const NoticeRead = lazy(() => import("../../pages/notice/ReadPage"));

const noticeRouter = () => {
  return [
    {
      path: "list",
      element: (
        <Suspense fallback={Loading}>
          <NoticeList />
        </Suspense>
      ),
    },
    {
      path: "",
      element: <Navigate replace to="/memnotice/list" />,
    },
    {
      path: "read/:n_num",
      element: (
        <Suspense fallback={Loading}>
          <NoticeRead />
        </Suspense>
      ),
    },
  ];
};
export default noticeRouter;
