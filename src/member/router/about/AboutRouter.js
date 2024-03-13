import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading....</div>;
const Greet = lazy(() => import("../../pages/about/AboutPage"));
const Designer = lazy(() => import("../../pages/about/DesignerPage"));
const Shop = lazy(() => import("../../pages/about/ShopPage"));

const AboutRouter = () => {
  return [
    {
      path: "greet",
      element:<Suspense fallback={Loading}> <Greet /> </Suspense>
    },
    {
      path: "",
      element: <Navigate replace to="/about/greet" />,
    },
    {
      path: "designer",
      element: <Suspense fallback={Loading}><Designer /></Suspense>
    },
    {
      path: "",
      element: <Navigate replace to="/about/designer" />,
    },
    {
      path: "shop",
      element: <Suspense fallback={Loading}><Shop /></Suspense>
    },
    {
      path: "",
      element: <Navigate replace to="/about/shop" />,
    }
  ]
}

export default AboutRouter;
