import LogoutComponent from "../../components/member/LogoutComponent";
import BasicLayout from "../../../common/layouts/BasicLayout"; 
const LogoutPage = () => {
  return (
    <div className="fixed top-0 left-0 z-[1055] flex flex-col h-full w-full">
      <BasicLayout>
      <div
        className="w-full flex flex-wrap  h-full justify-center  items-center border-2"
      >
        <LogoutComponent></LogoutComponent>
      </div>
      </BasicLayout>
    </div>
  );
};
export default LogoutPage;
