import { useEffect, useState } from "react";
import { getOne } from "../../../common/api/noticeApi";
import { API_SERVER_HOST } from "../../../common/api/noticeApi";
import useCustomMove from "../../../common/hooks/useCustomMove";

const initState = {
  n_num: 0,
  n_head: "",
  n_title: "",
  n_content: "",
  n_reg: "",
  uploadFileNames: [],
};

const host = API_SERVER_HOST;

const ReadComponent = ({ n_num }) => {
  const [notice, setNotice] = useState(initState);
  const { moveToList } = useCustomMove();

  useEffect(() => {
    getOne(n_num).then((data) => {
      console.log(data);
      setNotice(data);
    });
  }, [n_num]);

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      {makeDiv("글유형", notice.n_head)}
      {makeDiv("제목", notice.n_title)}
      {makeDiv("내용", notice.n_content)}
      {makeDiv(
        "첨부파일",
        notice.uploadFileNames.map((imgFile, i) => (
          <img
            alt="notice"
            key={i}
            className="p-6 w-4/12"
            src={`${host}/api/notice/view/${imgFile}`}
          />
        ))
      )}

      <div className="flex justify-end p-4">
        <button
          type="button"
          className="rounded p-2 m-2 text-xl w-32 text-white bg-blue-500"
          onClick={() => moveToList()}
        >
          목록
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
