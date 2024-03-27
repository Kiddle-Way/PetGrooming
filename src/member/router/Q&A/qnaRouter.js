import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading....</div>;
const ListPage = lazy(() => import("../../pages/Q&A/ListPage"));

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