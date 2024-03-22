import React, { useEffect, useState } from "react";
import { getList } from "../../../common/api/QnaApi";
import useCustomMove from "../../../common/hooks/useCustomMove";
import PageComponent from "../../../common/components/PageComponent";
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
  const { page, size, refresh, moveToList, moveToModify } = useCustomMove();

  const [serverData, setServerData] = useState(initState);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    getList({ page, size }).then((data) => {
      console.log(data);
      setServerData(data);
    });
  }, [page, size, refresh]);

  const toggleAccordion = (id) => {
    setExpandedId(id === expandedId ? null : id);
  };

  return (
    <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
      <div className="flex flex-wrap mx-auto justify-center p-6">
        {serverData.dtoList.map((qna) => (
          <div
            key={qna.f_num}
            className="w-full min-w-[400px] p-2 m-2 rounded shadow-md"
          >
            <div
              className="flex cursor-pointer justify-between items-center"
              onClick={() => toggleAccordion(qna.f_num)}
            >
              <div className="text-1xl m-1 p-2 font-extrabold">
                Q.{qna.f_title}
              </div>
              <button
                onClick={() => moveToModify(qna.f_num)}
                className="text-white bg-orange-500 rounded-md px-4 py-2"
              >
                수정
              </button>
            </div>
            {expandedId === qna.f_num && (
              <div className="p-2">A.{qna.f_content}</div>
            )}
          </div>
        ))}
      </div>
      <PageComponent serverData={serverData} movePage={moveToList} />
      <div className="flex justify-end p-4">
        <Link
          to={"/qna/add"}
          type="button"
          className="inline-block rounded p-2 m-2 text-center w-32 text-white bg-blue-500"
        >
          글쓰기
        </Link>
      </div>
    </div>
  );
};

export default ListComponent;
