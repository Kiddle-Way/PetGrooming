import LogoutComponent from "../../components/member/LogoutComponent";import LogoutComponent from "../../components/member/LogoutComponent";
import Navbar from "../../../common/layouts/Navbar";
const LogoutPage = () => {
  return (
    <div className="fixed top-0 left-0 z-[1055] flex flex-col h-full w-full">
      <Navbar />
      <div className="w-full flex flex-wrap justify-center items-center">
        <LogoutComponent></LogoutComponent>
      </div>
    </div>
  );
};
export default LogoutPage;
