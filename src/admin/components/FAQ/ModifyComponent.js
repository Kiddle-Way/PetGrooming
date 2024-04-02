import { useEffect, useState } from "react";
import { getOne, deleteOne, putOne } from "../../../common/api/FaqApi";
import useCustomMove from "../../../common/hooks/useCustomMove";

const initState = {
  f_num: 0,
  f_title: "",
  f_content: "",
};

const ModifyComponent = ({ f_num, moveList, moveRead }) => {
  const [faq, setFaq] = useState({ ...initState });

  const { moveToList } = useCustomMove();

  useEffect(() => {
    getOne(f_num).then((data) => setFaq(data));
  }, [f_num]);

  const handleChangeFaq = (e) => {
    faq[e.target.name] = e.target.value;
    setFaq({ ...faq });
  };

  const handleClickModify = () => {
    if (window.confirm("수정 하시겠습니까??")) {
      alert("수정되었습니다.");
      putOne(faq).then((data) => {
        console.log("modify result: " + data);
        moveToList({ page: 1 });
      });
    }
  };

  const handleClickDelete = () => {
    if (window.confirm("삭제 하시겠습니까??")) {
      alert("삭제되었습니다.");
      deleteOne(f_num).then((data) => {
        console.log("delete result: " + data);
        moveToList({ page: 1 });
      });
    }
  };

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">제목</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="f_title"
            type={"text"}
            value={faq.f_title}
            onChange={handleChangeFaq}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">내용</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="f_content"
            type={"text"}
            value={faq.f_content}
            onChange={handleChangeFaq}
          ></input>
        </div>
      </div>
      <div className="flex justify-end p-4">
        <button
          type="button"
          className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
          onClick={handleClickDelete}
        >
          삭제
        </button>
        <button
          type="button"
          className="rounded p-4 m-2 text-xl w-32 text-white bg-orange-500"
          onClick={handleClickModify}
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

export default ModifyComponent;
