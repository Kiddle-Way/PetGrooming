import { useEffect, useState } from "react";
import { getOne } from "../../../common/api/productApi";
import useCustomMove from "../../../common/hooks/useCustomMove";

const initState = {
  p_num: 0,
  p_type: "",
  p_name: "",
  p_price: 0,
};

const ReadComponent = ({ p_num }) => {
  const [product, setProduct] = useState(initState);
  const { moveToList, moveToModify } = useCustomMove();

  useEffect(() => {
    getOne(p_num).then((data) => {
      console.log(data);
      setProduct(data);
    });
  }, [p_num]);

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      {makeDiv("상품번호", product.p_num)}
      {makeDiv("상품유형", product.p_type)}
      {makeDiv("상품명", product.p_name)}
      {makeDiv("가격", product.p_price)}

      <div className="flex justify-end p-4">
        <button
          type="button"
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={() => moveToList()}
        >
          목록
        </button>

        <button
          type="button"
          className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={() => moveToModify(p_num)}
        >
          수정
        </button>
      </div>
    </div>
  );
};

const makeDiv = (title, value) => (
  <div
    className="flex justify-center"
    style={{ width: "80%", margin: "0 auto" }}
  >
    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
      <div className="w-1/5 p-6 text-right font-bold">{title}</div>
      <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
        {value}
      </div>
    </div>
  </div>
);

export default ReadComponent;
