import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const StatisticsRouter = () => {
  const Loading = <div>Loading......</div>;
  const Sales = lazy(() => import("../../pages/statistics/SalesPage"));
  const Reserve = lazy(() => import("../../pages/statistics/ReservePage"));
  const Product = lazy(() => import("../../pages/statistics/ProductPage"));
  const Breed = lazy(() => import("../../pages/statistics/BreedPage"));

  return [
    {
      path: "",
      element: <Navigate replace to="/statistics/sales" />,
    },
    {
      path: "sales",
      element: (
        <Suspense fallback={Loading}>
          <Sales />
        </Suspense>
      ),
    },
    {
      path: "reserve",
      element: (
        <Suspense fallback={Loading}>
          <Reserve />
        </Suspense>
      ),
    },
    {
      path: "breed",
      element: (
        <Suspense fallback={Loading}>
          <Breed />
        </Suspense>
      ),
    },
    {
      path: "product",
      element: (
        <Suspense fallback={Loading}>
          <Product />
        </Suspense>
      ),
    },
  ];
};
export default StatisticsRouter;
