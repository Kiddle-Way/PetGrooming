import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const productsRouter = () => {
  const Loading = <div>Loading......</div>;
  const ProductsList = lazy(() => import("../../pages/product/ListPage"));
  const ProductsGuide = lazy(() => import("../../pages/product/GuidePage"));
  const ProductsAdd = lazy(() => import("../../pages/product/AddPage"));
  const ProductRead = lazy(() => import("../../pages/product/ReadPage"));
  const ProductModify = lazy(() => import("../../pages/product/ModifyPage"));

  return [
    {
      path: "list",
      element: (
        <Suspense fallback={Loading}>
          <ProductsList />
        </Suspense>
      ),
    },
    {
      path: "/product",
      element: <Navigate replace to="/product/list" />,
    },
    {
      path: "guide",
      element: (
        <Suspense fallback={Loading}>
          <ProductsGuide />
        </Suspense>
      ),
    },
    {
      path: "add",
      element: (
        <Suspense fallback={Loading}>
          <ProductsAdd />
        </Suspense>
      ),
    },
    {
      path: "read/:p_num",
      element: (
        <Suspense fallback={Loading}>
          <ProductRead />
        </Suspense>
      ),
    },
    {
      path: "modify/:p_num",
      element: (
        <Suspense fallback={Loading}>
          <ProductModify />
        </Suspense>
      ),
    },
  ];
};
export default productsRouter;
