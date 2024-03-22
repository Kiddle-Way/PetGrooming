import { useEffect, useState } from "react";
import { getOne } from "../../../common/api/QnaApi";
import useCustomMove from "../../../common/hooks/useCustomMove";

const initState = {
  f_num: 0,
  f_title: "",
  f_content: "",
};

const ReadComponent = ({ f_num }) => {
  const [Qna, setQna] = useState(initState);
  const { moveToList, moveToModify } = useCustomMove();

  useEffect(() => {
    getOne(f_num).then((data) => {
      console.log(data);
      setQna(data);
    });
  }, [f_num]);

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      {makeDiv("제목", Qna.f_num)}
      {makeDiv("내용", Qna.f_content)}
      <div className="flex justify-end p-4">
        <button
          type="button"
          className=" rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
          onClick={() => moveToList()}
        >
          목록
        </button>
        <button
          type="button"
          className="rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
          onClick={() => moveToModify(f_num)}
        >
          수정
        </button>
      </div>
    </div>
  );
};

const makeDiv = (title, value) => (
  <div className="flex justify-center">
    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
      <div className="w-1/5 p-6 text-right font-bold">{title}</div>
      <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
        {value}
      </div>
    </div>
  </div>
);

export default ReadComponent;
