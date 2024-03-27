import { useNavigate } from "react-router-dom";
import BasicLayout from "../BasicLayout";
import { useCallback } from "react";

const IndexPage = () => {
  const navigate = useNavigate();

  const handleClickList = useCallback(() => {
    navigate({ pathname: "list" });
  });

  const handleClickAdd = useCallback(() => {
    navigate({ pathname: "add" });
  });

  const handleClickDelete = useCallback(() => {
    navigate({ pathname: "delete" });
  });

  return (
    <BasicLayout>
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 space-y-2 font-medium">
        <div
          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group cursor-pointer"
          onClick={handleClickList}
        >
          디자이너관리
        </div>

        <div
          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group cursor-pointer"
          onClick={handleClickAdd}
        >
          디자이너 등록
        </div>

        <div
          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group cursor-pointer"
          onClick={handleClickDelete}
        >
          디자이너 삭제
        </div>
      </div>
    </BasicLayout>
  );
};
export default IndexPage;
