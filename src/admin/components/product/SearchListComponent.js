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
  const [searchTerm, setSearchTerm] = useState("");
  const [serverData, setServerData] = useState(initState);
  const [isSearched, setIsSearched] = useState(false);

  const handleSearchClick = async () => {
    const pageParam = { page: 1, size: 10 };
    const data = await getSearch(searchTerm, pageParam);
    setServerData(data);
    setIsSearched(true);
    moveToList(1, size);
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (isSearched) {
        const data = await getSearch(searchTerm, { page, size });
        setServerData(data);
      } else {
        const data = await getList({ page, size });
        setServerData(data);
      }
    };
    fetchData();
  }, [page, size, refresh, isSearched]);

  return (
    <div className="mt-1 mr-2 ml-2">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="검색어를 입력하세요"
        className="px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-xs"
      />
      <button
        className="ml-2 p-2 bg-blue-500 text-white rounded-md"
        onClick={handleSearchClick}
      >
        검색
      </button>

      <div className="my-5 overflow-x-auto">
        <table className="table text-center">
          <thead>
            <tr className="bg-gradient-to-r from-green-200 via-green-100 to-yellow-200 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
              <th>상품번호</th>
              <th>상품유형</th>
              <th>상품명</th>
              <th>가격</th>
            </tr>
          </thead>
          <tbody>
            {serverData.dtoList.map((product, index) => (
              <tr
                key={product.p_num}
                className="cursor-pointer"
                onClick={() => moveToRead(product.p_num)}
              >
                <td>{product.p_num}</td>
                <td>{product.p_type}</td>
                <td>{product.p_name}</td>
                <td>{product.p_price.toLocaleString()}원</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PageComponent
        serverData={serverData}
        movePage={moveToList}
      ></PageComponent>
    </div>
  );
};

export default SearchListComponent;
