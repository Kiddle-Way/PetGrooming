import { Suspense, lazy } from "react";

const Loading = <div>Loading....</div>;
const Designer = lazy(() => import("../../member/pages/about/DesignerPage"));
const Shop = lazy(() => import("../../member/pages/about/ShopPage"));


const AboutRouter = [
{
  path: "designer",
  element: <Suspense fallback={Loading}><Designer /></Suspense>
},
{
  path: "shop",
  element: <Suspense fallback={Loading}><Shop /></Suspense>
}

]

export default AboutRouter;