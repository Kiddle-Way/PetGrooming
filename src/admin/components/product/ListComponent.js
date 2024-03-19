import { useEffect, useState } from "react";
import { getList } from "../../../common/api/productApi";
import useCustomMove from "../../../common/hooks/useCustomMove";
import PageComponent from "../../../common/components/PageComponent";

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
};
const ListComponent = () => {
  const { page, size, moveToList, refresh, moveToRead } = useCustomMove();

  //serverData 는 나중에 사용
  const [serverData, setServerData] = useState(initState);

  useEffect(() => {
    getList({ page, size }).then((data) => {
      console.log(data);
      setServerData(data);
    });
  }, [page, size, refresh]);

  return (
    <div className="border-2 border-blue-100 mt-1 mr-2 ml-2">
      <div className="flex flex-wrap mx-auto justify-center p-6">
        <div className="w-full min-w-[400px] p-2 m-2 rounded shadow-md text-gray-800 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium text-sm px-5 py-2.5 text-center me-2 mb-2">
          <div className="flex">
            <div className="text-1xl m-1 p-2 w-1/12 font-extrabold text-center">
              상품번호
            </div>
            <div className="text-1xl m-1 p-2 w-4/12 font-extrabold text-center">
              상품유형
            </div>
            <div className="text-1xl m-1 p-2 w-4/12 font-extrabold text-center">
              상품명
            </div>
            <div className="text-1xl m-1 p-2 w-4/12 font-extrabold text-center">
              가격
            </div>
          </div>
        </div>
        {serverData.dtoList.map((product) => (
          <div
            key={product.p_num}
            className="w-full min-w-[400px] p-2 m-2 rounded shadow-md cursor-pointer"
            onClick={() => moveToRead(product.p_num)}
          >
            <div className="flex">
              <div className="text-1xl m-1 p-2 w-1/12 font-medium text-center">
                {product.p_num}
              </div>
              <div className="text-1xl m-1 p-2 w-4/12 font-medium text-center">
                {product.p_type}
              </div>
              <div className="text-1xl m-1 p-2 w-4/12 font-medium text-center">
                {product.p_name}
              </div>
              <div className="text-1xl m-1 p-2 w-4/12 font-medium text-center">
                {product.p_price}
              </div>
            </div>
          </div>
        ))}
      </div>
      <PageComponent
        serverData={serverData}
        movePage={moveToList}
      ></PageComponent>
    </div>
  );
};

export default ListComponent;
