import { useEffect, useState } from "react";
import { getOne } from "../../../common/api/inquiryApi";
import { API_SERVER_HOST } from "../../../common/api/noticeApi";
import FetchingModal from "../../../common/components/FetchingModal";
import useCustomMove from "../../../common/hooks/useCustomMove";

const initState = {
  i_num: 0,
  m_num: 0,
  i_pw: 0,
  i_title: "",
  i_content: "",
  i_a_content: "",
  i_uploadFileNames: [],
};
const host = API_SERVER_HOST;
const ReadComponent = ({ i_num }) => {
  const [inquiry, setInquiry] = useState(initState);
  //fetching
  const [fetching, setFetching] = useState(false);
  const { moveToModify, moveToList } = useCustomMove();
  useEffect(() => {
    setFetching(true);
    getOne(i_num).then((data) => {
      setInquiry(data);
      setFetching(false);
    });
  }, [i_num]);

  const handleModifyClick = () => {
    if (inquiry.i_a_content !== "답변 미작성") {
      // 답변이 작성된 경우에만 수정 가능
      alert("답변이 작성되어 수정할 수 없습니다.");
    } else {
      // 답변이 작성되지 않은 경우에만 수정 가능
      moveToModify(i_num);
    }
  };

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      {fetching ? <FetchingModal /> : <></>}
      <div className="flex justify-center mt-10">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">문의 번호</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {inquiry.i_num}
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">
            문의 작성 회원 번호
          </div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {inquiry.m_num.m_num}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">문의 제목</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {inquiry.i_title}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">문의 비밀번호</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {inquiry.i_pw}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">문의 내용</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {inquiry.i_content}
          </div>
        </div>
      </div>
      <div className="w-full justify-center flex flex-col m-auto items-center">
        {inquiry.i_uploadFileNames.map((imgFile, i) => (
          <img
            alt="inquiry"
            key={i}
            className="p-4 w-1/2"
            src={`${host}/api/inquiry/view/${imgFile}`}
          />
        ))}
      </div>
    </div>
  );
};
export default ReadComponent;
