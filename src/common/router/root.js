import { Suspense, lazy } from "react";
import noticeRouter from "../../admin/router/notice/NoticeRouter";

const { createBrowserRouter } = require("react-router-dom");
import { createBrowserRouter } from "react-router-dom";
import AboutRouter from "../../member/router/about/AboutRouter";
import DesignerRouter from "../../admin/router/designer/DesignerRouter";
import productsRouter from "../../admin/router/product/productRouter";


const Loading = <div>Loading....</div>
const Main = lazy(() => import("../../member/pages/main/MainPage"))
const Main = lazy(() => import("../../member/pages/main/MainPage"));

const root = createBrowserRouter([
    {
        path: "",
        element: <Suspense fallback={Loading}><Main /></Suspense>
    }
    {
      path: "notice",
      element: (
        <Suspense fallback={Loading}>
          <Main />
        </Suspense>
      ),
      children: noticeRouter(),
    },
])


export default root;
