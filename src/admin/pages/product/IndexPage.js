import { useNavigate } from "react-router-dom";
import BasicLayout from "../BasicLayout";
import { useCallback } from "react";

const IndexPage = () => {
  const navigate = useNavigate();
  const handleClickList = useCallback(() => {
    navigate("list");
    window.location.reload();
  });
  const handleClickGuide = useCallback(() => {
    navigate({ pathname: "guide" });
  });

  return (
    <BasicLayout>
      <div className="h-auto px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 space-y-2 font-medium">
        <div
          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group cursor-pointer"
          onClick={handleClickList}
        >
          상품 목록
        </div>
        <div
          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group cursor-pointer"
          onClick={handleClickGuide}
        >
          미용 안내
        </div>
      </div>
    </BasicLayout>
  );
};
export default IndexPage;
