import { Outlet } from "react-router-dom";
import BasicLayout from "../../../common/layouts/BasicLayout";
import useCustomLogin from "../../../common/hooks/useCustomLogin";

const IndexPage = () => {
  const { isLogin, moveToLoginReturn } = useCustomLogin();

  if (!isLogin) {
    return moveToLoginReturn();
  }
  return (
    <>
      <BasicLayout>
        <Outlet />
      </BasicLayout>
    </>
  );
};
export default IndexPage;
