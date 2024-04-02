import { useEffect, useState } from "react";
import { getList, search } from "../../../common/api/noticeApi";
import useCustomMove from "../../../common/hooks/useCustomMove";
import PageComponent from "../../../common/component/PageComponent";
import { Link } from "react-router-dom";

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

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (category) => {
    console.log("Selected category:", category);
    setSearchType(category);
  };

  const handleSearchButtonClick = async () => {
    if (!searchTerm.trim()) {
      alert("검색어를 입력해주세요.");
    }

    const pageParam = { page: 1, size: 10 };
    try {
      const result = await search(
        searchType === "제목" ? "title" : "content",
        searchTerm,
        pageParam
      );
      setServerData(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getList({ page, size }).then((data) => {
      console.log(data);
      setServerData(data);
    });
  }, [page, size, refresh, searchTerm]);

  return (
    <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
      <div className="flex flex-wrap mx-auto justify-center p-6">
        <div className="w-full p-2 m-2 rounded shadow-md">
          <div className="flex">
            <div className="font-extrabold text-left m-1 text-1xl p-2 w-2/12">
              게시물 번호
            </div>
            <div className="font-extrabold text-1xl m-1 p-2 w-8/12">
              리뷰제목
            </div>
            <div className="text-1xl m-1 p-2 w-2/10 font-medium">작성자</div>
          </div>
        </div>
        {serverData.dtoList.map((notice) => (
          <div
            key={notice.n_num}
            className="w-full min-w-[400px] p-2 m-2 rounded shadow-md"
            onClick={() => moveToRead(notice.n_num)}
          >
            <div className="flex">
              <div className="font-extrabold text-2xl p-2 w-2/12">
                {notice.n_num}
              </div>
              <div className="text-1xl m-1 p-2 w-8/12 font-extrabold">
                {notice.n_head}
                {notice.n_title}
              </div>
              <div className="text-1xl m-1 p-2 w-2/10 font-medium">
                {notice.n_reg}
              </div>
            </div>
          </div>
        ))}
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
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleSearchButtonClick}
          >
            검색
          </button>
        </div>
      </div>
      <div className="flex justify-end p-4">
        <Link
          to={"/notice/add"}
          type="button"
          className="inline-block rounded p-2 m-2 text-center w-32 text-white bg-blue-500"
        >
          글쓰기
        </Link>
      </div>
    </div>
  );
};

const categories = ["제목", "내용"];

export default ListComponent;
