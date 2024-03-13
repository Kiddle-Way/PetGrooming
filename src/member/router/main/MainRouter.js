import { Suspense, lazy } from "react";

const Loading = <div>Loading....</div>;
const Greet = lazy(() => import("../../member/pages/about/AboutPage"));

const MainRouter = [
    
    {
        path: "greet",
        element: <Suspense fallback={Loading}><Greet /></Suspense>
    }
    
];

export default MainRouter;