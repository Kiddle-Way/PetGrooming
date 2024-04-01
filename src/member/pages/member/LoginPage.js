import LoginComponent from "../../components/member/LoginComponent";
import BasicLayout from "../../../common/layouts/BasicLayout";

const LoginPage = () => {
  return (
    <BasicLayout>
      <div className="top-0 left-0 z-[1055] flex flex-col mx-auto h-full w-full">
        <div className="text-2x1">
          <LoginComponent />
        </div>
      </div>
    </BasicLayout>
  );
};

export default LoginPage;
