import { useEffect, useState } from "react";
import { getList, search } from "../../../common/api/reviewApi"; // getList 및 search 함수 import
import useCustomMove from "../../../common/hooks/useCustomMove";
import PageComponent from "../../../common/components/PageComponent";
import { PiStarFill, PiStarLight } from "react-icons/pi";

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
  const { page, size, refresh, moveToList, moveToRead } = useCustomMove();
  const [serverData, setServerData] = useState(initState);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("제목");
  const [rating, setRating] = useState(0);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (category) => {
    console.log("Selected category:", category);
    setSearchType(category);
  };

  const handleSearchButtonClick = async () => {
    const pageParam = { page: 1, size: 10 };
    try {
      const result = await search(
        searchType === "제목" ? "title" : "content",
        searchTerm,
        pageParam
      );
      setServerData(result); // 검색 결과로 서버 데이터 업데이트
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  useEffect(() => {
    if (!searchTerm) {
      // 검색어가 비어있을 때 전체 목록을 불러옴
      getList({ page, size }).then((data) => {
        setServerData(data);
      });
    }
  }, [page, size, refresh, searchTerm]); // 페이지, 사이즈, 리프레시, 검색어가 변경되었을 때만 useEffect 실행

  return (
    <div className="overflow-x-auto">
      <div className="table text-center">
        <table className="table w-full">
          <thead>
            <tr className="flex bg-yellow-100">
              <th className="w-2/12">게시물 번호</th>
              <th className="w-4/12">제목</th>
              <th className="w-2/12">별점</th>
              <th className="w-3/12">작성자</th>
              <th className="w-1/12">등록일</th>
            </tr>
          </thead>
          <tbody>
            {serverData.dtoList.map((review) => (
              <tr
                key={review.v_num}
                className="flex m-1 p-2"
                onClick={() => moveToRead(review.v_num)}
              >
                <td className="w-2/12">{review.v_num}</td>
                <td className="w-4/12">{review.v_title}</td>
                <td className="w-2/12 flex">
                  {[...Array(review.v_rating)].map((a, i) => (
                    <PiStarFill className="star-lg" key={i} />
                  ))}
                  {[...Array(5 - review.v_rating)].map((a, i) => (
                    <PiStarLight className="star-lg" key={i} />
                  ))}
                </td>
                <td className="w-3/12">{review.m_num.m_name}</td>
                <td className="w-1/12">
                  {new Date(review.v_date)
                    .toLocaleDateString()
                    .replace(/\.$/, "")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <PageComponent
          serverData={serverData}
          movePage={moveToList}
        ></PageComponent>
      </div>
      <div className="flex justify-center">
        <div className="flex items-center">
          <select
            className="px-4 py-2 mr-2 border rounded"
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <input
            className="px-4 py-2 mr-2 border rounded"
            type="text"
            placeholder="검색"
            value={searchTerm}
            onChange={handleChange}
          />
          <button
            className="px-4 py-2 bg-orange-300 text-white rounded"
            onClick={handleSearchButtonClick}
          >
            검색
          </button>
        </div>
      </div>
    </div>
  );
};

const categories = ["제목", "내용"];

export default ListComponent;