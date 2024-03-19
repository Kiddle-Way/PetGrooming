import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
 
const Loading = <div>Loading....</div> 
const InquiryList =  lazy(() => import("../../pages/inquiry/ListPage")) 
const InquiryRead = lazy(() => import("../../pages/inquiry/ReadPage")) 
const InquiryAdd = lazy(() => import("../../pages/inquiry/AddPage"))
const InquiryModify = lazy(() => import("../../pages/inquiry/ModifyPage"))

const inquiryRouter = () => { 
 
  return [ 
    { 
      path: "list", 
      element: <Suspense fallback={Loading}><InquiryList/></Suspense> 
    },
    {
      path: "", 
      element: <Navigate replace to="list"/> 
    },
    {
      path: "read/:m_num", 
      element: <Suspense fallback={Loading}><InquiryRead/></Suspense>
    },
    {
      path: "add", 
      element: <Suspense fallback={Loading}><InquiryAdd/></Suspense>
    },
    {
      path: "modify/:m_num", 
      element: <Suspense fallback={Loading}><InquiryModify/></Suspense>
    } 
  ] 
 
} 
 
export default inquiryRouter;