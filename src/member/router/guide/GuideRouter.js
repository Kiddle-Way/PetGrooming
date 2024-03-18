import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading....</div>;
const Guide = lazy(() => import("../../pages/guide/GuidePage"));

const AboutRouter = () => {
  return [
    {
      path: "guide",
      element: (
        <Suspense fallback={Loading}>
          <Guide />
        </Suspense>
      ),
    },
  ];
};

export default AboutRouter;
