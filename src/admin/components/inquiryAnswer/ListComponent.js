import { useEffect, useState } from "react";
import { getList } from "../../../common/api/inquiryAnswerApi";
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
      <div className="flex flex-wrap mx-auto p-6">
        {serverData.dtoList.map((inquiry) => (
          <div
            key={inquiry.i_num}
            className="w-1/2 p-1 rounded shadow-md border-2"
            onClick={() => moveToRead(inquiry.i_num)}
          >
            <div className="flex flex-col h-full">
              <div className="font-extrabold text-2xl p-2 w-full flex justify-between">
                <span className="text-xl">{inquiry.i_num}</span>
                {inquiry.i_a_content === "답변 미작성" ? (
                  <span className="text-red-500 bg-red-100 rounded-md px-2 text-sm">
                    답변대기
                  </span>
                ) : (
                  <span className="text-green-500 bg-green-100 rounded-md px-2 text-sm">
                    답변완료
                  </span>
                )}
              </div>
              <div className="text-1xl m-1 p-2 w-full flex flex-col">
                <div className="bottom-0 font-extrabold bg-white">
                  <div className="text-center p-1">
                    문의제목 : {inquiry.i_title}
                  </div>
                  <div className="text-center p-1">
                    문의내용 : {inquiry.m_num.m_email}
                  </div>
                </div>
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
