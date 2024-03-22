import { useState, useRef } from "react";
import { postAdd } from "../../../common/api/noticeApi";
import useCustomMove from "../../../common/hooks/useCustomMove";

const initState = {
  n_head: "[공지사항]",
  n_title: "",
  n_content: "",
  files: [],
};

const AddComponent = () => {
  const [notice, setNotice] = useState({ ...initState });
  const uploadRef = useRef();
  const [result, setResult] = useState(null);

  const { moveToList } = useCustomMove();

  const handleChangeNotice = (e) => {
    notice[e.target.name] = e.target.value;
    setNotice({ ...notice });
  };

  const handleClickAdd = () => {
    const files = uploadRef.current.files;

    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    //other data
    formData.append("n_head", notice.n_head);
    formData.append("n_title", notice.n_title);
    formData.append("n_content", notice.n_content);
    console.log(formData);

    if (window.confirm("등록 하시겠습니까??")) {
      alert("등록되었습니다.");
      postAdd(formData).then((data) => {
        setResult(data.RESULT);
        moveToList({ page: 1 });
      });
    }
  };

  const handleClickCancel = () => {
    if (window.confirm("취소 하시겠습니까??")) {
      alert("취소되었습니다.");
      moveToList({ page: 1 });
    }
  };

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">글유형</div>
          <div className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-me">
            <select
              className="w-4/5 p-1 rounded-r border border-solid border-neutral-300 shadow-me"
              name="n_head"
              value={notice.n_head}
              onChange={handleChangeNotice}
            >
              <option value="[공지사항]">[공지사항]</option>
              <option value="[이벤트]">[이벤트]</option>
              <option value="[휴일공지]">[휴일공지]</option>
            </select>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">제목</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
            name="n_title"
            type={"text"}
            value={notice.n_title}
            onChange={handleChangeNotice}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="realative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">내용</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
            name="n_content"
            type={"text"}
            value={notice.n_content}
            onChange={handleChangeNotice}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">첨부파일</div>
          <label
            className="input-file-button inline-block rounded p-2 m-6 text-center center text-xl w-32 text-white bg-yellow-300"
            for="input-file"
          >
            파일선택
          </label>
          <input
            id="input-file"
            style={{ display: "none" }}
            ref={uploadRef}
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            type={"file"}
            multiple={true}
          ></input>
        </div>
      </div>
      <div className="flex justify-end">
        <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
          <button
            type="button"
            className="inline-block rounded p-2 m-2 text-xl w-32 text-white bg-blue-400"
            onClick={handleClickAdd}
          >
            등록
          </button>
        </div>
        <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
          <button
            type="button"
            className="inline-block rounded p-2 m-2 text-xl w-32 text-white bg-red-400"
            onClick={handleClickCancel}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddComponent;
