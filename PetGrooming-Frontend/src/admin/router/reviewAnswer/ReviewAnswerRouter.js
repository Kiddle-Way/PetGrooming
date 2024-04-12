import { Suspense, lazy } from "react";
import { Navigate } from "react-router";

const ReviewAnswerRouter = () => {
  const Loading = <div>Loading....</div>;
  const ReviewAnswerList = lazy(() =>
    import("../../pages/reviewAnswer/ListPage")
  );
  const ReviewAnswerRead = lazy(() =>
    import("../../pages/reviewAnswer/ReadPage")
  );
  const ReviewAnswerModify = lazy(() =>
    import("../../pages/reviewAnswer/ModifyPage")
  );
  return [
    {
      path: "list",
      element: (
        <Suspense fallback={Loading}>
          <ReviewAnswerList />
        </Suspense>
      ),
    },
    {
      path: "",
      element: <Navigate replace to="/reviewAnswer/list/" />,
    },
    {
      path: "read/:v_num",
      element: (
        <Suspense fallback={Loading}>
          <ReviewAnswerRead />
        </Suspense>
      ),
    },
    {
      path: "modify/:v_num",
      element: (
        <Suspense fallback={Loading}>
          <ReviewAnswerModify />
        </Suspense>
      ),
    },
  ];
};

export default ReviewAnswerRouter;
