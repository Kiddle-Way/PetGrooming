import { useEffect, useState } from "react";
import { getOne } from "../../../common/api/reviewAnswerApi";
import useCustomMove from "../../../common/hooks/useCustomMove";

const initState = {
  v_num: 0,
  v_pw: 0,
  v_title: "",
  v_content: "",
  v_c_content: "",
  v_uploadFileNames: [],
};

const ReadComponent = ({ v_num }) => {
  const [review, setReview] = useState(initState);
  //화면 이동용 함수
  const { moveToList, moveToModify } = useCustomMove();
  useEffect(() => {
    getOne(v_num).then((data) => {
      setReview(data);
    });
  }, [v_num]);
  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">답변</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {review.v_c_content}
          </div>
        </div>
      </div>
      <div className="flex justify-end p-4">
        <button
          type="button"
          className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
          onClick={() => moveToModify(v_num)}
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
