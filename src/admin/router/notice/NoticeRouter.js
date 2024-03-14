import { Suspense, lazy } from "react";

const Loading = <div>Loading....</div>;
const NoticeList = lazy(() => import("../../pages/notice/ListPage"));
const NoticeAdd = lazy(() => import("../../pages/notice/AddPage"));
const NoticeRead = lazy(() => import("../../pages/notice/ReadPage"));
const NoticeModify = lazy(() => import("../../pages/notice/ModifyPage"));

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
      path: "add",
      element: (
        <Suspense fallback={Loading}>
          <NoticeAdd />
        </Suspense>
      ),
    },
    {
      path: "read/:n_num",
      element: (
        <Suspense fallback={Loading}>
          <NoticeRead />
        </Suspense>
      ),
    },
    {
      path: "modify/:n_num",
      element: (
        <Suspense fallback={Loading}>
          <NoticeModify />
        </Suspense>
      ),
    },
  ];
};

export default noticeRouter;
