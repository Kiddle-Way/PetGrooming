import { Suspense, lazy } from "react";
import { Navigate } from "react-router";

const Loading = <div>Loading....</div>;
const DesignerList = lazy(() => import("../../pages/designer/ListPage"));
const DesignerRead = lazy(() => import("../../pages/designer/ReadPage"));
const DesignerAdd = lazy(() => import("../../pages/designer/AddPage"));
const DesignerModify = lazy(() => import("../../pages/designer/ModifyPage"));

const DesignerRouter = () => { 
  return [
    {
      path: "list",
      element : <Suspense fallback={Loading}><DesignerList/></Suspense>
    },
    {
      path: "",
      element : <Navigate replace to = "list"/>
    },
    {
      path: "read/:d_num",
      element: <Suspense fallback={Loading}><DesignerRead/></Suspense>
    },
    {
      path: "add",
      element: <Suspense fallback={Loading}><DesignerAdd/></Suspense>
    },
    {
      path: "modify/:d_num",
      element: <Suspense fallback={Loading}><DesignerModify/></Suspense>
    }
    
  ]
}

export default DesignerRouter;
