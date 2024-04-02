import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading....</div>;
const ListPage = lazy(() => import("../../pages/FAQ/ListPage"));

const faqRouter = () => {
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
      element: <Navigate replace to="/memberfaq/list" />,
    },
  ];
};

export default faqRouter;
