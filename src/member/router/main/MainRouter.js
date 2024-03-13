
const Notice = lazy(() => import("../../member/pages/notice/NoticePage"));
const Guide = lazy(() => import("../../member/pages/guide/GuidePage"));
const Reserve = lazy(() => import("../../member/pages/reserve/ReservePage"));
const Review = lazy(() => import("../../member/pages/review/ReviewPage"));
const QA = lazy(() => import("../../member/pages/inquiry/QAPage"));
const Inquiry = lazy(() => import("../../member/pages/inquiry/InquiryPage"));


const MainRouter = () => {
    return [
        {
            path: "about",
            element: <Suspense fallback={Loading}> <About /></Suspense>
        },
        {
            path: "greet",
            element:<Suspense fallback={Loading}><Greet /></Suspense>
        },
        {
            path: "designer",
            element: <Suspense fallback={Loading}><Designer /></Suspense>
        },
        {
            path: "shop",
            element: <Suspense fallback={Loading}> <Shop /></Suspense>

        },
        {
            path: "notice",
            element: <Suspense fallback={Loading}><Notice /></Suspense>
        },
        {
            path: "guide",
            element: <Suspense fallback={Loading}> <Guide /></Suspense>
        },
        {
            path: "reserve",
            element: <Suspense fallback={Loading}><Reserve /> </Suspense>
        },
        {
            path: "review",
            element: <Suspense fallback={Loading}><Review /></Suspense>
        },
        {
            path: "Q&A",
            element: <Suspense fallback={Loading}><QA /></Suspense>
        },
        {
            path: "inquiry",
            element: <Suspense fallback={Loading}><Inquiry /></Suspense>

        },
    ]
}
export default MainRouter;
