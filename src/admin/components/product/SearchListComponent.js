import { useEffect, useState } from "react";
import { getSearch } from "../../../common/api/productApi";
import useCustomMove from "../../../common/hooks/useCustomMove";
import PageComponent from "../../../common/components/PageComponent";
import { getList } from "../../../common/api/productApi";

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

const SearchListComponent = () => {
  const { page, size, moveToList, refresh, moveToRead } = useCustomMove();
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 state 추가
  const [serverData, setServerData] = useState(initState);
  const [isSearched, setIsSearched] = useState(false); // 검색 여부를 저장하는 상태 추가

  const handleSearchClick = async () => {
    const pageParam = { page: 1, size: 10 };
    const data = await getSearch(searchTerm, pageParam);
    setServerData(data);
    setIsSearched(true); // 검색 버튼을 클릭하면 isSearched를 true로 설정
    moveToList(1, size); // 검색 버튼 클릭 시 항상 첫 페이지로 이동하도록 설정
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };


  useEffect(() => {
    const fetchData = async () => {
      // 검색어가 있다면 검색어가 포함된 상품 목록 출력
      if (isSearched) {
        const data = await getSearch(searchTerm, { page, size });
        setServerData(data);
        // 검색어가 없다면 전체 상품 목록
      } else {
        const data = await getList({ page, size });
        setServerData(data);
      }
    };
    fetchData();
  }, [page, size, refresh, isSearched]);

  return (
    <div className="border-2 border-blue-100 mt-1 mr-2 ml-2">
      {/* 검색어 입력창 */}
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange} // 검색어 변경 처리
        placeholder="검색어를 입력하세요"
      />
      <button
        className="ml-2 p-2 bg-blue-500 text-white rounded-md"
        onClick={handleSearchClick}
      >
        검색
      </button>

      {/* 상품 목록 */}
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
      {/* 페이지 네비게이션 */}
      <PageComponent
        serverData={serverData}
        movePage={moveToList}
      ></PageComponent>
    </div>
  );
};

export default SearchListComponent;
