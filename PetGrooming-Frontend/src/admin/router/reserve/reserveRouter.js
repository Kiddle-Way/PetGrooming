import { Suspense, lazy } from "react";

const reserveRouter = () => {
  const Loading = <div>Loading......</div>;
  const ReserveAllList = lazy(() =>
    import("../../pages/reserve/ReserveListPage")
  );
  const PastList = lazy(() => import("../../pages/reserve/PastLstPage"));

  return [
    {
      path: "",
      element: (
        <Suspense fallback={Loading}>
          <ReserveAllList />
        </Suspense>
      ),
    },
    {
      path: "past",
      element: (
        <Suspense fallback={Loading}>
          <PastList />
        </Suspense>
      ),
    },
  ];
};

export default reserveRouter;
