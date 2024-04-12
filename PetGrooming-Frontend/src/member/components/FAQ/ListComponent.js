import React, { useEffect, useState } from "react";
import { getList, search } from "../../../common/api/FaqApi";
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
  const { page, size, refresh, moveToList } = useCustomMove();

  const [serverData, setServerData] = useState(initState);
  const [expandedId, setExpandedId] = useState(null);
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
      console.error("비회원 접근입니다:", error);
    }
  };

  useEffect(() => {
    getList({ page, size })
      .then((data) => {
        console.log(data);
        setServerData(data);
      })
      .catch((error) => {
        console.error("비회원 접근입니다:", error);
      });
  }, [page, size, refresh, searchTerm]);

  const toggleAccordion = (id) => {
    setExpandedId(id === expandedId ? null : id);
  };

  return (
    <div className="border-2 border-yellow-100 mt-10 mr-2 ml-2">
      <div className="flex flex-wrap mx-auto justify-center p-6">
        {serverData.dtoList.map((faq) => (
          <div
            key={faq.f_num}
            className="w-full min-w-[400px] p-2 m-2 rounded shadow-md"
          >
            <div
              className="flex cursor-pointer justify-between items-center"
              onClick={() => toggleAccordion(faq.f_num)}
            >
              <div className="text-1xl m-1 p-2 font-extrabold">
                Q.{faq.f_title}
              </div>
            </div>
            {expandedId === faq.f_num && (
              <div className="p-2">A.{faq.f_content}</div>
            )}
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
