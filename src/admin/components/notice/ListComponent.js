import { useEffect, useState } from "react";
import { getList } from "../../../common/api/noticeApi";
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

  useEffect(() => {
    getList({ page, size }).then((data) => {
      console.log(data);
      setServerData(data);
    });
  }, [page, size, refresh]);

  return (
    <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
      <div className="flex flex-wrap mx-auto justify-center p-6">
        <div className="w-full p-2 m-2 rounded shadow-md">
          <div className="flex">
            <div className="font-extrabold text-left m-1 text-1xl p-2 w-1/12">
              게시물 번호
            </div>
            <div className="font-extrabold text-1xl m-1 p-2 w-8/12">제목</div>
            <div className="text-1xl m-1 p-2 w-2/10 font-medium">등록일</div>
          </div>
        </div>
        {serverData.dtoList.map((notice) => (
          <div
            key={notice.n_num}
            className="w-full min-w-[400px] p-2 m-2 rounded shadow-md"
            onClick={() => moveToRead(notice.n_num)}
          >
            <div className="flex">
              <div className="font-extrabold text-2xl p-2 w-1/12">
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
      <PageComponent
        serverData={serverData}
        movePage={moveToList}
      ></PageComponent>
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

export default ListComponent;
