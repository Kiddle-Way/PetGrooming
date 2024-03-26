import { useEffect, useRef, useState } from "react";
import { getOne, putOne, deleteOne } from "../../../common/api/reviewApi";
import { API_SERVER_HOST } from "../../../common/api/noticeApi";
import useCustomMove from "../../../common/hooks/useCustomMove";
import FetchingModal from "../../../common/components/FetchingModal";
import ResultModal from "../../../common/components/ResultModal";
import { PiStarFill, PiStarLight } from "react-icons/pi";

const initState = {
  v_num: 0,
  v_pw: 0,
  v_title: "",
  v_content: "",
  v_c_content: "",
  v_rating: 0,
  v_uploadFileNames: [],
  v_delFlag: false,
};

const host = API_SERVER_HOST;

const ModifyComponent = ({ v_num }) => {
  const [review, setReview] = useState(initState);
  const [fetching, setFetching] = useState(false);
  const uploadRef = useRef();
  //결과 모달
  const [result, setResult] = useState(null);
  //이동용 함수
  const { moveToRead, moveToList } = useCustomMove();
  const [rating, setRating] = useState(0);

  useEffect(() => {
    setFetching(true);
    getOne(v_num).then((data) => {
      setReview(data)
      setRating(data.v_rating);;
      setFetching(false);
    });
  }, [v_num]);

  const handleChangeReview = (e) => {
    review[e.target.name] = e.target.value;
    setReview({ ...review });
  };

  const handleChangeRating = (newRating) => {
    setRating(newRating);
    setReview((prevState) => ({
      ...prevState,
      v_rating: newRating,
    }));
  };

  const deleteOldImages = (imageName) => {
    const resultFileNames = review.v_uploadFileNames.filter(
      (fileName) => fileName !== imageName
    );
    review.v_uploadFileNames = resultFileNames;
    setReview({ ...review });
  };

  const handleClickModify = () => {
    const files = uploadRef.current.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("v_files", files[i]);
    }
    //other data
    formData.append("v_title", review.v_title);
    formData.append("v_pw", review.v_pw);
    formData.append("v_content", review.v_content);
    formData.append("v_c_content", review.v_c_content);
    formData.append("v_rating", review.v_rating);
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

  const handleClickDelete = () => {
    setFetching(true);
    deleteOne(v_num).then((data) => {
      setResult("Deleted");
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
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="v_title"
            type={"text"}
            value={review.v_title}
            onChange={handleChangeReview}
          ></input>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">비밀번호</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="v_pw"
            type={"password"}
            value={review.v_pw}
            onChange={handleChangeReview}
          ></input>
        </div>
      </div>
      <div>
        <div className="flex justify-start items-center">
          <div className="w-1/5 p-6 text-right font-bold">별점</div>
          {[...Array(rating)].map((a, i) => (
            <PiStarFill
              className="star-lg"
              key={i}
              onClick={() => handleChangeRating(i + 1)}
            />
          ))}
          {[...Array(5 - rating)].map((a, i) => (
            <PiStarLight
              className="star-lg"
              key={i}
              onClick={() => handleChangeRating(rating + i + 1)}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">리뷰 내용</div>
          <textarea
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md resize-y"
            name="v_content"
            rows="10"
            onChange={handleChangeReview}
            value={review.v_content}
          >
            {review.v_content}
          </textarea>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">리뷰 사진</div>
          <input
            ref={uploadRef}
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            type={"file"}
            multiple={true}
          ></input>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Images</div>
          <div className="w-4/5 justify-center flex flex-wrap items-start">
            {review.v_uploadFileNames.map((imgFile, i) => (
              <div className="flex justify-center flex-col w-1/3" key={i}>
                <button
                  className="bg-blue-500 text-3xl text-white"
                  onClick={() => deleteOldImages(imgFile)}
                >
                  DELETE
                </button>
                <img alt="img" src={`${host}/api/review/view/${imgFile}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-end p-4">
        <button
          type="button"
          className="rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
          onClick={handleClickDelete}
        >
          Delete
        </button>
        <button
          type="button"
          className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-orange-500"
          onClick={handleClickModify}
        >
          Modify
        </button>
        <button
          type="button"
          className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
        >
          List
        </button>
      </div>
    </div>
  );
};
export default ModifyComponent;
