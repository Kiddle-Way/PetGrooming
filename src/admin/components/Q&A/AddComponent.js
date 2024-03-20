import { useState } from "react";
import { postAdd } from "../../../common/api/QnaApi";

const initState = {
  f_title: "",
  f_content: "",
};

const AddComponent = () => {
  const [qna, setQna] = useState({ ...initState });

  const handleChangeQna = (e) => {
    qna[e.target.name] = e.target.value;
    setQna({ ...qna });
  };
  const handleClickAdd = () => {
    postAdd(qna)
      .then((result) => {
        console.log(result);
        setQna({ ...initState });
      })
      .catch((e) => {
        console.error(e);
      });
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
      <div className="flex justify-end">
        <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
          <button
            type="button"
            className="rounded p-4 w-36 bg-blue-500 text-xl text-white"
            onClick={handleClickAdd}
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddComponent;
