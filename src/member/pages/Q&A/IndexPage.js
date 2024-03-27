import { Outlet } from "react-router-dom";
import BasicLayout from "../../../common/layouts/BasicLayout";

const IndexPage = () => {
  return (
    <>
      <BasicLayout>
        <Outlet />
      </BasicLayout>
    </>
  );
};
export default IndexPage;
