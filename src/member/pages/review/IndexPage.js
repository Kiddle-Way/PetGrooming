import BasicLayout from "../../../common/layouts/BasicLayout";
import useCustomLogin from "../../../common/hooks/useCustomLogin";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

const IndexPage = () => {
  const { isLogin, moveToLoginReturn } = useCustomLogin();
  if (!isLogin) {
    return moveToLoginReturn();
  }

  return (
    <>
      <BasicLayout>
        <aside className="w-[275px] h-auto px-3 py-4 overflow-y-auto bg-amber-400 dark:bg-gray-800 ">
          <div className="w-full h-auto px-3 py-4 overflow-y-auto bg-amber-400 dark:bg-gray-800 space-y-2 font-bold text-lg">
            <div className="flex items-center p-2 text-white rounded-lg dark:text-white hover:text-gray-50 hover:bg-amber-500 dark:hover:bg-gray-700 group cursor-pointer">
              <Link to={"/review/list"}>리뷰 목록</Link>
            </div>
            <div className="flex items-center p-2 text-white rounded-lg dark:text-white hover:text-gray-50 hover:bg-amber-500 dark:hover:bg-gray-700 group cursor-pointer">
              <Link to={"/review/add"}>리뷰 작성</Link>
            </div>
          </div>
        </aside>
        <div className="bg-white w-full flex flex-col">
          <Outlet />
        </div>
      </BasicLayout>
    </>
  );
};
export default IndexPage;
