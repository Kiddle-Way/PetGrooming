import BasicLayout from "../../../common/layouts/BasicLayout";
import { Outlet } from "react-router-dom";

const IndexPage = () => {
  return (
    <>
      <BasicLayout>
        <div className="bg-white w-full flex flex-col">
          <Outlet />
        </div>
      </BasicLayout>
    </>
  );
};
export default IndexPage;
