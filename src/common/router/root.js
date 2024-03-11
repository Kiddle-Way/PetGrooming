import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const Loading = <div>Loading....</div>;
const Main = lazy(() => import("../../member/pages/main/MainPage"));
const About = lazy(() => import("../../member/pages/about/AboutPage"));
const Greet = lazy(() => import("../../member/pages/about/AboutPage"));
const Designer = lazy(() => import("../../member/pages/about/DesignerPage"));
const Shop = lazy(() => import("../../member/pages/about/ShopPage"));
const Notice = lazy(() => import("../../member/pages/notice/NoticePage"));
const Guide = lazy(() => import("../../member/pages/about/ShopPage"));
const Reserve = lazy(() => import("../../member/pages/about/AboutPage"));
const Review = lazy(() => import("../../member/pages/about/DesignerPage"));
const QA = lazy(() => import("../../member/pages/about/ShopPage"));
const Inquiry = lazy(() => import("../../member/pages/about/ShopPage"));

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
        {" "}
        <About />{" "}
      </Suspense>
    ),
  },
  {
    path: "greet",
    element: (
      <Suspense fallback={Loading}>
        {" "}
        <Greet />{" "}
      </Suspense>
    ),
  },
  {
    path: "designer",
    element: (
      <Suspense fallback={Loading}>
        {" "}
        <Designer />
      </Suspense>
    ),
  },
  {
    path: "shop",
    element: (
      <Suspense fallback={Loading}>
        {" "}
        <Shop />
      </Suspense>
    ),
  },
  {
    path: "notice",
    element: (
      <Suspense fallback={Loading}>
        <Notice />
      </Suspense>
    ),
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
        <Reserve />
      </Suspense>
    ),
  },
  {
    path: "review",
    element: (
      <Suspense fallback={Loading}>
        <Review />
      </Suspense>
    ),
  },
  {
    path: "Q&A",
    element: (
      <Suspense fallback={Loading}>
        <QA />
      </Suspense>
    ),
  },
  {
    path: "inquiry",
    element: (
      <Suspense fallback={Loading}>
        <Inquiry />
      </Suspense>
    ),
  },
]);

export default root;
// {
//     path: "guide",
//     element: <Suspense fallback={Loading}><Guide/></Suspense>
// },
// {
//     path: "reserve",
//     element: <Suspense fallback={Loading}><Reserve /></Suspense>
// },
// {
//     path: "review",
//     element: <Suspense fallback={Loading}><Review /></Suspense>
// },
// {
//     path: "Q&A",
//     element: <Suspense fallback={Loading}><QA/></Suspense>
// },
// {
//     path: "inquiry",
//     element: <Suspense fallback={Loading}><Inquiry /></Suspense>
// }
