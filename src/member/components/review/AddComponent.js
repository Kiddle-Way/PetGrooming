import { useRef, useState, useEffect } from "react";
import { postAdd } from "../../../common/api/reviewApi";
import FetchingModal from "../../../common/components/FetchingModal";
import ResultModal from "../../../common/components/ResultModal";
import useCustomMove from "../../../common/hooks/useCustomMove";
import { getCookie } from "../../../common/util/cookieUtil";
import { PiStarFill, PiStarLight } from "react-icons/pi";

const initState = {
  v_title: "",
  v_pw: "",
  v_content: "",
  v_files: [],
  m_num: "1",
};

const AddComponent = () => {
  const [review, setReview] = useState({ ...initState });
  const uploadRef = useRef();

  const [fetching, setFetching] = useState(false);

  const [result, setResult] = useState(null);

  const { moveToList } = useCustomMove();

  const [rating, setRating] = useState(5);

  const handleChangeRating = (newRating) => {
    setRating(newRating);
    setReview((prevState) => ({
      ...prevState,
      v_rating: newRating,
    }));
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 쿠키에서 m_num 값을 가져와서 상태로 설정
    const memberCookieValue = getCookie("member");
    if (memberCookieValue) {
      setReview((prevState) => ({
        ...prevState,
        m_num: memberCookieValue.m_num,
      }));
    }
  }, []); // [] 빈 배열을 전달하여 한 번만 실행되도록 설정

  const handleChangeReview = (e) => {
    review[e.target.name] = e.target.value;
    setReview({ ...review });
  };

  const handleClickAdd = (e) => {
    const files = uploadRef.current.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("v_files", files[i]);
    }
    //other data
    formData.append("v_title", review.v_title);
    formData.append("v_pw", review.v_pw);
    formData.append("v_content", review.v_content);
    formData.append("m_num", review.m_num);
    formData.append("v_rating", review.v_rating);
    console.log(formData);

    setFetching(true);
    postAdd(formData).then((data) => {
      setFetching(false);
      setResult(data.result);
    });
  };

  const closeModal = () => {
    //ResultModal 종료
    setResult(null);
    moveToList({ page: 1 });
  };

  return (
    <div className="border-2 bg-yellow-200 mt-10 m-2 p-4">
      {fetching ? <FetchingModal /> : <></>}
      {result ? (
        <ResultModal
          title={"Product Add Result"}
          content={`${result}번 등록 완료`}
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
            {review.pdesc}
          </textarea>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">리뷰 사진</div>
          <input
            ref={uploadRef}
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300
  shadow-md"
            type={"file"}
            multiple={true}
          ></input>
        </div>
      </div>
      <div className="flex justify-end">
        <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
          <button
            type="button"
            className="rounded p-4 w-36 bg-blue-500 text-xl text-white "
            onClick={handleClickAdd}
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddComponent;
