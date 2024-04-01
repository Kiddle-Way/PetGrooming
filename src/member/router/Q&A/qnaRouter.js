import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading....</div>;
const ListPage = lazy(() => import("../../../member/pages/Q&A/listPage"));

const qnaRouter = () => {
  return [
    {
      path: "list",
      element: (
        <Suspense fallback={Loading}>
          <ListPage />
        </Suspense>
      ),
    },
    {
      path: "",
      element: <Navigate replace to="/memberqna/list" />,
    },
  ];
};

export default qnaRouter;