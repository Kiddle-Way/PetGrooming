import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import AboutRouter from "../../member/router/about/AboutRouter";
import noticeRouter from "../../admin/router/notice/NoticeRouter";
import DesignerRouter from "../../admin/router/designer/DesignerRouter";
import productsRouter from "../../admin/router/product/productRouter";
import reserveRouter from "../../member/router/reserve/reserveRouters";
import reviewRouter from "../../member/router/review/reviewRouter";
import inquiryRouter from "../../member/router/inquiry/inquiryRouter";
import memberRouter from "../../member/router/member/memberRouter";
import qnaRouter from "../../admin/router/Q&A/QnaRouter";
import Guide from "../../admin/pages/product/GuidePage";
import ReviewAnswerRouter from "../../admin/router/reviewAnswer/ReviewAnswerRouter";

const Loading = <div>Loading....</div>;
const Main = lazy(() => import("../../member/pages/main/MainPage"));
const AboutIndex = lazy(() => import("../../member/pages/about/IndexPage"));
const DesignerIndex = lazy(() =>
  import("../../admin/pages/designer/IndexPage")
);
const DesignerIndex = lazy(() =>
  import("../../admin/pages/designer/IndexPage")
);
const ProductsIndex = lazy(() => import("../../admin/pages/product/IndexPage"));
const NoticeIndex = lazy(() => import("../../admin/pages/notice/IndexPage"));
const QnaIndex = lazy(() => import("../../admin/pages/Q&A/IndexPage"));
// const DesignerList = lazy(() => import("../../admin/pages/designer/ListPage"));

const ReserveIndex = lazy(() => import("../../member/pages/reserve/IndexPage"));
const ReviewIndex = lazy(() => import("../../member/pages/review/IndexPage"));
const Inquiry = lazy(() => import("../../member/pages/inquiry/IndexPage"));
const Join = lazy(() => import("../../member/pages/member/JoinPage"));
const Login = lazy(() => import("../../member/pages/member/LoginPage"));
const MyPage = lazy(() => import("../../member/pages/member/MyPage"));
const ReviewAnswerIndex = lazy(() =>
  import("../../admin/pages/reviewAnswer/IndexPage")
);

const root = createBrowserRouter([
  {
    path: "",
    element: (
      <Suspense fallback={Loading}>
        <Main />
      </Suspense>
    ),
  },
  {
    path: "about",
    element: (
      <Suspense fallback={Loading}>
        <AboutIndex />
      </Suspense>
    ),
    children: AboutRouter(),
  },
  {
    path: "designer",
    element: (
      <Suspense fallback={Loading}>
        <DesignerIndex />
      </Suspense>
    ),
    children: DesignerRouter(),
  },
  {
    path: "product",
    element: (
      <Suspense fallback={Loading}>
        <ProductsIndex />
      </Suspense>
    ),
    children: productsRouter(),
  },
  {
    path: "guide",
    element: (
      <Suspense fallback={Loading}>
        <Guide />
      </Suspense>
    ),
  },
  {
    path: "reserve",
    element: (
      <Suspense fallback={Loading}>
        <ReserveIndex />
      </Suspense>
    ),
    children: reserveRouter(),
  },
  {
    path: "review",
    element: (
      <Suspense fallback={Loading}>
        <ReviewIndex />
      </Suspense>
    ),
    children: reviewRouter(),
  },
  {
    path: "member",
    children: memberRouter(),
  },
  {
    path: "inquiry",
    element: (
      <Suspense fallback={Loading}>
        <Inquiry />
      </Suspense>
    ),
    children: inquiryRouter(),
  },
  {
    path: "join",
    element: (
      <Suspense fallback={Loading}>
        <Join />
      </Suspense>
    ),
  },
  {
    path: "login",
    element: (
      <Suspense fallback={Loading}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "myPage",
    element: (
      <Suspense fallback={Loading}>
        <MyPage />
      </Suspense>
    ),
  },
  {
    path: "notice",
    element: (
      <Suspense fallback={Loading}>
        <NoticeIndex />
      </Suspense>
    ),
    children: noticeRouter(),
  },
  {
    path: "qna",
    element: (
      <Suspense fallback={Loading}>
        <QnaIndex />
      </Suspense>
    ),
    children: qnaRouter(),
  },
  {
    path: "reviewAnswer",
    element: (
      <Suspense fallback={Loading}>
        <ReviewAnswerIndex />
      </Suspense>
    ),
    children: ReviewAnswerRouter(),
  },
]);

export default root;
