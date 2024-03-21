import { Suspense, lazy } from "react";
import { Navigate } from "react-router";

const inquiryAnswerRouter = () => {
  const Loading = <div>Loading....</div>;
  const InquiryAnswerList = lazy(() =>
    import("../../pages/inquiryAnswer/ListPage")
  );
  const InquiryAnswerRead = lazy(() =>
    import("../../pages/inquiryAnswer/ReadPage")
  );
  const InquiryAnswerModify = lazy(() =>
    import("../../pages/inquiryAnswer/ModifyPage")
  );
  return [
    {
      path: "list",
      element: (
        <Suspense fallback={Loading}>
          <InquiryAnswerList />
        </Suspense>
      ),
    },
    {
      path: "",
      element: <Navigate replace to="/inquiryAnswer/list" />,
    },
    {
      path: "read/:i_num",
      element: (
        <Suspense fallback={Loading}>
          <InquiryAnswerRead />
        </Suspense>
      ),
    },
    {
      path: "modify/:i_num",
      element: (
        <Suspense fallback={Loading}>
          <InquiryAnswerModify />
        </Suspense>
      ),
    },
  ];
};

export default inquiryAnswerRouter;
