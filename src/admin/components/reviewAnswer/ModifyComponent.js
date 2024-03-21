import { useEffect, useRef, useState } from "react";
import { getOne, putOne } from "../../../common/api/reviewApi";
import { API_SERVER_HOST } from "../../../common/api/noticeApi";
import useCustomMove from "../../../common/hooks/useCustomMove";
import FetchingModal from "../../../common/components/FetchingModal";
import ResultModal from "../../../common/components/ResultModal";

const initState = {
  v_num: 0,
  v_pw: 0,
  v_title: "",
  v_content: "",
  v_c_content: "",
  v_uploadFileNames: [],
  m_num: 0,
  v_delFlag: false,
};

const host = API_SERVER_HOST;

const ModifyComponent = ({ v_num }) => {
  const [review, setReview] = useState(initState);
  const [fetching, setFetching] = useState(false);
  //결과 모달
  const [result, setResult] = useState(null);
  //이동용 함수
  const { moveToRead, moveToList } = useCustomMove();

  useEffect(() => {
    setFetching(true);
    getOne(v_num).then((data) => {
      setReview(data);
      setFetching(false);
    });
  }, [v_num]);

  const handleChangeReview = (e) => {
    review[e.target.name] = e.target.value;
    setReview({ ...review });
  };

  const handleClickModify = () => {
    const formData = new FormData();
    //other data
    formData.append("v_title", review.v_title);
    formData.append("v_pw", review.v_pw);
    formData.append("v_content", review.v_content);
    formData.append("v_c_content", review.v_c_content);
    for (let i = 0; i < review.v_uploadFileNames.length; i++) {
      formData.append("v_uploadFileNames", review.v_uploadFileNames[i]);
    }
    //fetching
    setFetching(true);
    putOne(v_num, formData).then((data) => {
      //수정 처리
      setResult("Modified");
      setFetching(false);
    });
  };

  const closeModal = () => {
    if (result === "Modified") {
      moveToRead(v_num); // 조회 화면으로 이동
    } else if (result === "Deleted") {
      moveToList({ page: 1 });
    }
    setResult(null);
  };

  const handleClickCancel = () => {
    if (window.confirm("취소 하시겠습니까??")) {
      alert("취소되었습니다.");
      moveToRead(v_num);
    }
  };

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      {fetching ? <FetchingModal /> : <></>}
      {result ? (
        <ResultModal
          title={`${result}`}
          content={"정상적으로 처리되었습니다."} //결과 모달창
          callbackFn={closeModal}
        />
      ) : (
        <></>
      )}
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">리뷰 제목</div>
          <div className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md">
            {review.v_title}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">리뷰 내용</div>
          <div className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md resize-y">
            {review.v_content}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">첨부파일</div>
          <div className="w-4/5 justify-center flex flex-wrap items-start">
            {review.v_uploadFileNames.map((imgFile, i) => (
              <div className="flex justify-center flex-col w-1/3" key={i}>
                <img alt="img" src={`${host}/api/review/view/${imgFile}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">리뷰 답변</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="v_c_content"
            type={"text"}
            value={review.v_c_content}
            onChange={handleChangeReview}
          ></input>
        </div>
      </div>
      <div className="flex justify-end p-4">
        <button
          type="button"
          className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
          onClick={handleClickModify}
        >
          수정하기
        </button>
        <button
          type="button"
          className="rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
          onClick={handleClickCancel}
        >
          취소
        </button>
      </div>
    </div>
  );
};
export default ModifyComponent;
