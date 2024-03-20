import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading....</div>;
const Checkout = lazy(() => import("./Checkout"));
const Success = lazy(() => import("./Success"));
const Fail = lazy(() => import("./Fail"));

const PayRouter = () => {
  return [
    {
      path: "/",
      element: (
        <Suspense fallback={Loading}>
          <Checkout />
        </Suspense>
      ),
    },
    {
      path: "",
      element: <Navigate replace to="/pay/" />,
    },
    {
      path: "success",
      element: (
        <Suspense fallback={Loading}>
          <Success />
        </Suspense>
      ),
    },
    {
      path: "",
      element: <Navigate replace to="/pay/success" />,
    },
    {
      path: "fail",
      element: (
        <Suspense fallback={Loading}>
          <Fail />
        </Suspense>
      ),
    },
    {
      path: "",
      element: <Navigate replace to="/pay/fail" />,
    },
  ];
};

export default PayRouter;
