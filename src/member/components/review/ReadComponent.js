import { useEffect, useState } from "react";
import { getOne } from "../../../common/api/reviewApi";
import { API_SERVER_HOST } from "../../../common/api/noticeApi";
import useCustomMove from "../../../common/hooks/useCustomMove";
import FetchingModal from "../../../common/components/FetchingModal";

const initState = {
  v_num: 0,
  m_num: 0,
  v_pw: 0,
  v_title: "",
  v_content: "",
  v_c_content: "",
  v_uploadFileNames: [],
};
const host = API_SERVER_HOST;
const ReadComponent = ({ v_num }) => {
  const [review, setReview] = useState(initState);
  //화면 이동용 함수
  const { moveToList, moveToModify } = useCustomMove();
  //fetching
  const [fetching, setFetching] = useState(false);
  useEffect(() => {
    setFetching(true);
    getOne(v_num).then((data) => {
      setReview(data);
      setFetching(false);
    });
  }, [v_num]);

  const handleModifyClick = () => {
    if (review.v_c_content !== "답변 미작성") {
      // 답변이 작성된 경우에만 수정 가능
      alert("답변이 작성되어 수정할 수 없습니다.");
    } else {
      // 답변이 작성되지 않은 경우에만 수정 가능
      moveToModify(v_num);
    }
  };
  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      {fetching ? <FetchingModal /> : <></>}
      <div className="flex justify-center mt-10">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">리뷰 번호</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {review.v_num}
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">
            리뷰 작성 회원 번호
          </div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {review.m_num.m_num}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">리뷰 제목</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {review.v_title}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">리뷰 비밀번호</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {review.v_pw}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">리뷰 내용</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {review.v_content}
          </div>
        </div>
      </div>
      <div className="w-full justify-center flex flex-col m-auto items-center">
        {review.v_uploadFileNames.map((imgFile, i) => (
          <img
            alt="review"
            key={i}
            className="p-4 w-1/2"
            src={`${host}/api/review/view/${imgFile}`}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">리뷰답변</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {review.v_c_content}
          </div>
        </div>
      </div>
      <div className="flex justify-end p-4">
        <button
          type="button"
          className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
          onClick={handleModifyClick}
        >
          수정
        </button>
        <button
          type="button"
          className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
          onClick={moveToList}
        >
          목록
        </button>
      </div>
    </div>
  );
};
export default ReadComponent;
