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
  const [sortByRatingAsc, setSortByRatingAsc] = useState(true); // 별점 오름차순으로 정렬

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

  const handleSortByRating = () => {
    const sortedData = [...serverData.dtoList].sort((a, b) => {
      if (sortByRatingAsc) {
        return b.v_rating - a.v_rating; // 내림차순으로 변경
      } else {
        return a.v_rating - b.v_rating;
      }
    });
    setServerData({ ...serverData, dtoList: sortedData });
    setSortByRatingAsc(!sortByRatingAsc); // 정렬 순서 변경
  };

  return (
    <div className="overflow-x-auto">
      <div className="table text-center">
        <table className="table w-full">
          <thead>
            <tr className="flex bg-green-100">
              <th className="w-2/12">게시물 번호</th>
              <th className="w-5/12">제목</th>
              <th className="w-2/12">별점</th>
              <th className="w-3/12">작성자</th>
            </tr>
          </thead>
          <tbody>
            {serverData.dtoList.map((review) => (
              <tr
                key={review.v_num}
                className="flex cursor-pointer"
                onClick={() => moveToRead(review.v_num)}
              >
                <td className="font-extrabold flex text-left m-1 text-1xl p-2 w-2/12">
                  {review.v_num}
                </td>
                <td className="font-extrabold flex text-left m-1 text-1xl p-2 w-5/12">
                  {review.v_title}
                  <span
                    className={`rounded-md px-2 text-sm ${
                      review.v_c_content === "답변 미작성"
                        ? "text-red-500 bg-red-100"
                        : "text-green-500 bg-green-100"
                    }`}
                  >
                    {review.v_c_content === "답변 미작성"
                      ? "답변대기"
                      : "답변완료"}
                  </span>
                </td>
                <td className="flex text-left m-1 text-1xl p-2 w-2/12">
                  {[...Array(review.v_rating)].map((_, i) => (
                    <PiStarFill className="star-lg" key={i} />
                  ))}
                  {[...Array(5 - review.v_rating)].map((_, i) => (
                    <PiStarLight className="star-lg" key={i} />
                  ))}
                </td>
                <td className="flex text-left m-1 text-1xl p-2 w-3/12">
                  {review.m_num.m_email}
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
          <button
            className={`px-4 py-2 rounded ml-2 ${
              sortByRatingAsc
                ? "bg-green-300 text-white"
                : "bg-red-300 text-white"
            }`}
            onClick={handleSortByRating}
          >
            {sortByRatingAsc ? "별점 높은 순" : "별점 낮은 순"}
          </button>
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
            className="px-4 py-2 bg-blue-500 text-white rounded"
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
