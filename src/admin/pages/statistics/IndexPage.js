import { useNavigate } from "react-router";
import BasicLayout from "../BasicLayout";
import { useCallback } from "react";

const IndexPage = () => {
  const navigate = useNavigate();

  const handleClickSales = useCallback(() => {
    navigate({ pathname: "sales" });
  });

  const handleClickReserve = useCallback(() => {
    navigate({ pathname: "reserve" });
  });

  const handleClickProduct = useCallback(() => {
    navigate({ pathname: "product" });
  });

  const handleClickBreed = useCallback(() => {
    navigate({ pathname: "breed" });
  });

  return (
    <BasicLayout>
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 space-y-2 font-medium">
        <div
          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group cursor-pointer"
          onClick={handleClickSales}
        >
          매출 통계
        </div>
        <div
          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group cursor-pointer"
          onClick={handleClickReserve}
        >
          예약 통계
        </div>
        <div
          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group cursor-pointer"
          onClick={handleClickProduct}
        >
          상품별 예약 통계
        </div>
        <div
          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group cursor-pointer"
          onClick={handleClickBreed}
        >
          견종별 예약 통계
        </div>
      </div>
    </BasicLayout>
  );
};

export default IndexPage;
