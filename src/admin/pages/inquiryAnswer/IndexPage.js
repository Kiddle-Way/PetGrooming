import { useNavigate } from "react-router";
import BasicLayout from "../BasicLayout";
import { useCallback } from "react";
import { Link } from "react-router-dom";

const IndexPage = () => {
  const navigate = useNavigate();

  const handleClickList = useCallback(() => {
    navigate({ pathname: "list" });
  });
  return (
    <BasicLayout>
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 space-y-2 font-medium">
        <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group cursor-pointer">
          <Link to={"/qna/"}>자주묻는질문</Link>
        </div>
        <div
          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group cursor-pointer"
          onClick={handleClickList}
        >
          문의게시판
        </div>
      </div>
    </BasicLayout>
  );
};

export default IndexPage;
