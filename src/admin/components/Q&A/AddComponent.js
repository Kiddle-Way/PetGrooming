import { useState } from "react";
import { postAdd } from "../../../common/api/QnaApi";
import useCustomMove from "../../../common/hooks/useCustomMove";

const initState = {
  f_title: "",
  f_content: "",
};

const AddComponent = () => {
  const [qna, setQna] = useState({ ...initState });

  const { moveToList } = useCustomMove();

  const handleChangeQna = (e) => {
    qna[e.target.name] = e.target.value;
    setQna({ ...qna });
  };
  const handleClickAdd = () => {
    if (!qna.f_title || !qna.f_content) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    if (window.confirm("등록 하시겠습니까?")) {
      alert("등록되었습니다.");
      postAdd(qna)
        .then((result) => {
          console.log(result);
          setQna({ ...initState });
          moveToList({ page: 1 });
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };
  const handleClickCancel = () => {
    if (window.confirm("취소 하시겠습니까?")) {
      moveToList({ page: 1 });
    }
  };

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">제목</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
            name="f_title"
            type={"text"}
            value={qna.f_title}
            onChange={handleChangeQna}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">내용</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
            name="f_content"
            type={"text"}
            value={qna.f_content}
            onChange={handleChangeQna}
          ></input>
        </div>
      </div>
      <div className="flex justify-end p-4">
        <button
          type="button"
          className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
          onClick={handleClickCancel}
        >
          취소
        </button>
        <button
          type="button"
          className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
          onClick={handleClickAdd}
        >
          등록
        </button>
      </div>
    </div>
  );
};

export default AddComponent;
