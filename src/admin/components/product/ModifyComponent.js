import { useEffect, useState } from "react";
import { getOne, deleteOne, putOne } from "../../../common/api/productApi";
import useCustomMove from "../../../common/hooks/useCustomMove";
import ResultModal from "../product/ResultModal";

const initState = {
  p_num: 0,
  p_type: "",
  p_name: "",
  p_price: 0,
};

const ModifyComponent = ({ p_num }) => {
  const [product, setProduct] = useState({ ...initState });

  const [result, setResult] = useState(null);

  const { moveToList, moveToRead } = useCustomMove();

  useEffect(() => {
    getOne(p_num).then((data) => setProduct(data));
    console.log(product);
  }, [p_num]);

  const handleClickModify = () => {
    // 수정 버튼 클릭시
    putOne(product).then((data) => {
      setResult("수정 완료");
    });
  };

  const handleClickDelete = () => {
    // 삭제 버튼 클릭시
    deleteOne(p_num).then((data) => {
      setResult("삭제 완료");
    });
  };

  const closeModal = () => {
    if (result === "삭제 완료") {
      moveToList();
    } else {
      moveToRead(p_num);
    }
  };

  const handleChangeProduct = (e) => {
    product[e.target.name] = e.target.value;
    setProduct({ ...product });
  };

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      {result ? (
        <ResultModal
          title={"처리결과"}
          content={result}
          callbackFn={closeModal}
        ></ResultModal>
      ) : (
        <></>
      )}
      <div className="flex justify-center mt-10">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">상품번호</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md bggray-100">
            {product.p_num}
          </div>
        </div>
      </div>
      <div className="flex justify-start items-center">
        <div className="relative mb-4 flex w-full flex-wrap items-center">
          <div className="w-1/5 p-6 text-right font-bold">상품유형</div>
          <div className="w-4/5 p-5 rounded-r border border-solid borderneutral-300 shadow-md">
            <select
              className="w-60 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="p_type"
              value={product.p_type}
              onChange={handleChangeProduct}
            >
              <option value="">상품유형을 선택해주세요!</option>
              <option value="필수상품">필수상품</option>
              <option value="추가상품">추가상품</option>
            </select>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">상품명</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid borderneutral-300 shadow-md"
            name="p_name"
            type={"text"}
            value={product.p_name}
            onChange={handleChangeProduct}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">가격</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid borderneutral-300 shadow-md"
            name="p_price"
            type={"number"}
            value={product.p_price}
            onChange={handleChangeProduct}
          ></input>
        </div>
      </div>

      <div className="flex justify-end p-4">
        <button
          type="button"
          className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={handleClickModify}
        >
          수정완료
        </button>

        <button
          type="button"
          className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={handleClickDelete}
        >
          삭제
        </button>
      </div>
    </div>
  );
};
export default ModifyComponent;
