import { useState } from "react";
import { postAdd } from "../../../common/api/productApi";
import ResultModal from "../../components/product/ResultModal";
import useCustomMove from "../../../common/hooks/useCustomMove";

const initState = {
  p_type: "",
  p_name: "",
  p_price: 0,
};

const AddComponent = () => {
  const [product, setProduct] = useState({ ...initState });

  const [result, setResult] = useState(null);

  const { moveToList } = useCustomMove();

  const handleChangeProduct = (e) => {
    product[e.target.name] = e.target.value;
    setProduct({ ...product });
  };

  const handleClickAdd = (e) => {
    postAdd(product)
      .then((result) => {
        console.log(result);
        setResult(result.P_NUM);
        setProduct({ ...initState });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const closeModal = () => {
    setResult(null);
    moveToList();
  };

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      {/* 모달 처리 */}
      {result ? (
        <ResultModal
          title={"등록 결과"}
          content={`새 상품 ${result} 등록 완료`}
          callbackFn={closeModal}
        />
      ) : (
        <></>
      )}
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
      <div className="flex justify-end">
        <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={handleClickAdd}
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddComponent;
