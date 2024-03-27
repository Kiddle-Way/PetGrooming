import { Suspense, lazy } from "react";

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
