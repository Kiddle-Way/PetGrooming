import { Suspense, lazy } from "react";
import noticeRouter from "../../admin/router/notice/NoticeRouter";

const { createBrowserRouter } = require("react-router-dom");

const Loading = <div>Loading....</div>;
const Main = lazy(() => import("../../member/pages/main/MainPage"));

const root = createBrowserRouter([
  {
    path: "notice",
    element: (
      <Suspense fallback={Loading}>
        <Main />
      </Suspense>
    ),
    children: noticeRouter(),
  },
]);

export default root;
