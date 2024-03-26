import LoginComponent from "../../components/member/LoginComponent";
import Navbar from "../../../common/layouts/Navbar";

const LoginPage = () => {
  return (
    <div className="top-0 left-0 z-[1055] flex flex-col mx-auto h-full w-full">
      <Navbar />
        <div className="text-2x1">
          <LoginComponent />
        </div>
    </div>
  );
};

export default LoginPage;
