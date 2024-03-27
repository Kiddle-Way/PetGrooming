import LoginComponent from "../../components/member/LoginComponent";
import BasicLayout from "../../../common/layouts/BasicLayout";

const LoginPage = () => {
  return (
    <div className="fixed top-0 left-0 z-[1055] flex flex-col h-full w-full">
      <BasicLayout>
        <div className="w-full flex flex-wrap  h-full justify-center  items-center border-2">
          <div className="text-2x1">
            <LoginComponent />
          </div>
        </div>
      </BasicLayout>
    </div>
  );
};

export default LoginPage;
