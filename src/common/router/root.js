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
import faqRouter from "../../admin/router/FAQ/FaqRouter";
import ReviewAnswerRouter from "../../admin/router/reviewAnswer/ReviewAnswerRouter";
import inquiryAnswerRouter from "../../admin/router/inquiryAnswer/inquiryAnswerRouter";
import memberfaqRouter from "../../member/router/FAQ/faqRouter";
import noticeRouter2 from "../../member/router/notice/noticeRouter";
import statisticsRouter from "../../admin/router/statistics/StatisticsRoter";
import adminReserveRouter from "../../admin/router/reserve/reserveRouter";

const Loading = <div>Loading....</div>;
const Main = lazy(() => import("../../member/pages/main/MainPage"));
const AboutIndex = lazy(() => import("../../member/pages/about/IndexPage"));
const DesignerIndex = lazy(() =>
  import("../../admin/pages/designer/IndexPage")
);
const ProductsIndex = lazy(() => import("../../admin/pages/product/IndexPage"));
const NoticeIndex = lazy(() => import("../../admin/pages/notice/IndexPage"));
const FaqIndex = lazy(() => import("../../admin/pages/FAQ/IndexPage"));
const Guide = lazy(() => import("../../member/pages/guide/GuidePage"));
// const DesignerList = lazy(() => import("../../admin/pages/designer/ListPage"));
const MemberFaqIndex = lazy(() => import("../../member/pages/FAQ/IndexPage"));
const ReserveIndex = lazy(() => import("../../member/pages/reserve/IndexPage"));
const ReviewIndex = lazy(() => import("../../member/pages/review/IndexPage"));
const InquiryIndex = lazy(() => import("../../member/pages/inquiry/IndexPage"));
const ReviewAnswerIndex = lazy(() =>
  import("../../admin/pages/reviewAnswer/IndexPage")
);
const InquiryAnswerIndex = lazy(() =>
  import("../../admin/pages/inquiryAnswer/IndexPage")
);
const MemberNoticeIndex = lazy(() =>
  import("../../member/pages/notice/IndexPage")
);
const AdminLogin = lazy(() => import("../../admin/pages/login/LoginPage"));
const StatisticsIndex = lazy(() =>
  import("../../admin/pages/statistics/IndexPage")
);
const ReserveList = lazy(() => import("../../admin/pages/reserve//IndexPage"));

const root = createBrowserRouter([
  {
    path: "reserve/list",
    element: (
      <Suspense fallback={Loading}>
        <ReserveList />
      </Suspense>
    ),
    children: adminReserveRouter(),
  },
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
        {" "}
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
    path: "faq",
    element: (
      <Suspense fallback={Loading}>
        <FaqIndex />
      </Suspense>
    ),
    children: faqRouter(),
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
    path: "memberfaq",
    element: (
      <Suspense fallback={Loading}>
        <MemberFaqIndex />
      </Suspense>
    ),
    children: memberfaqRouter(),
  },
  {
    path: "memnotice",
    element: (
      <Suspense fallback={Loading}>
        <MemberNoticeIndex />
      </Suspense>
    ),
    children: noticeRouter2(),
  },
  {
    path: "statistics",
    element: (
      <Suspense fallback={Loading}>
        <StatisticsIndex />
      </Suspense>
    ),
    children: statisticsRouter(),
  },
]);

export default root;
