import { useEffect, useState } from "react";
import { getOne } from "../../../common/api/designerApi";
import useCustomMove from "../../../common/hooks/useCustomMove";
//import { API_SERVER_HOST } from "../../../common/api/productApi";
import FetchingModal from "../../../common/components/FetchingModal";

const initState = {
  dno: 0,
  dname: "",
  dgender: 0,
  demail: "",
  dphone: "",
  dstate: 0,
  dintro: "",
  dbirth: "",
  dh_date: "",
  dattach: "",
  complete: false,
};


//const host = API_SERVER_HOST;

const ReadComponent = ({ dno }) => {
  const [designer, setDesigner] = useState(initState);
  //화면    이동용   함수
  const { moveToList, moveToModify } = useCustomMove();

  //fetching
  const [fetching, setFetching] = useState(false);
  useEffect(() => {
    setFetching(true);
    getOne(dno).then((data) => {
      setDesigner(data);
      setFetching(false);
    });
  }, [dno]);

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4 ">
      {fetching ? <FetchingModal /> : <></>}

      <div className="flex justify-end p-4">
        <button
          type="button"
          className="inline-block rounded p-4 m-2 text-xs w-20 text-white bg-red-500"
          onClick={() => moveToModify(dno)}
        >
          수정
        </button>
        <button
          type="button"
          className="rounded p-4 m-2 text-xs w-20 text-white bg-blue-500"
          onClick={moveToList}
        >
          목록
        </button>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">상태</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {designer.dstate === "1" ? "퇴사" : "근무"}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">이름</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {designer.dname}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">생년월일</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {designer.dbirth}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">성별</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {designer.dgender === 1 ? "여자" : "남자"}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">휴대폰번호</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {designer.dphone}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">이메일</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {designer.demail}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">입사일</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {designer.dh_date}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">소개</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {designer.dintro}
          </div>
        </div>
      </div>

      {/* <div className="w-full justify-center flex flex-col m-auto items-center">
        {designer.uploadFileNames.length > 0 ? (
          designer.uploadFileNames.map((imgFile, i) => (
            <img
              alt="designer"
              key={i}
              className="p-4 w-1/2"
              src={`${host}/api/designer/view/${imgFile}`}
            />
          ))
        ) : (
          <button className="p-4 bg-blue-500 text-white rounded">
            첨부파일
          </button>
        )}
      </div> */}
    </div>
  );
};

export default ReadComponent;
