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
import ReviewAnswerRouter from "../../admin/router/reviewAnswer/ReviewAnswerRouter";
import inquiryAnswerRouter from "../../admin/router/inquiryAnswer/inquiryAnswerRouter";
import memberRouter2 from "../../admin/router/member/MemberRouter";

const Loading = <div>Loading....</div>;
const Main = lazy(() => import("../../member/pages/main/MainPage"));
const AboutIndex = lazy(() => import("../../member/pages/about/IndexPage"));
const DesignerIndex = lazy(() =>
  import("../../admin/pages/designer/IndexPage")
);
const ProductsIndex = lazy(() => import("../../admin/pages/product/IndexPage"));
const NoticeIndex = lazy(() => import("../../admin/pages/notice/IndexPage"));
const QnaIndex = lazy(() => import("../../admin/pages/Q&A/IndexPage"));
const Guide = lazy(() => import("../../member/pages/guide/GuidePage"));
// const DesignerList = lazy(() => import("../../admin/pages/designer/ListPage"));
const ReserveIndex = lazy(() => import("../../member/pages/reserve/IndexPage"));
const ReviewIndex = lazy(() => import("../../member/pages/review/IndexPage"));
const InquiryIndex = lazy(() => import("../../member/pages/inquiry/IndexPage"));
const ReviewAnswerIndex = lazy(() =>
  import("../../admin/pages/reviewAnswer/IndexPage")
);
const InquiryAnswerIndex = lazy(() =>
  import("../../admin/pages/inquiryAnswer/IndexPage")
);
const MemberIndex = lazy(() => import("../../admin/pages/member/IndexPage"));
const AdminLogin = lazy(() => import("../../admin/pages/login/LoginPage"));

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
        <InquiryIndex />
      </Suspense>
    ),
    children: inquiryRouter(),
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
  {
    path: "inquiryAnswer",
    element: (
      <Suspense fallback={Loading}>
        <InquiryAnswerIndex />
      </Suspense>
    ),
    children: inquiryAnswerRouter(),
  },
  {
    path: "memberList",
    element: (
      <Suspense fallback={Loading}>
        <MemberIndex />
      </Suspense>
    ),
    children: memberRouter2(),
  },
]);

export default root;
