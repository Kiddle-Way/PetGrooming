import { useEffect, useRef, useState } from "react";
import { getOne, putOne } from "../../../common/api/noticeApi";
import useCustomMove from "../../../common/hooks/useCustomMove";
import { API_SERVER_HOST } from "../../../common/api/noticeApi";

const initState = {
  n_num: 0,
  n_head: "",
  n_title: "",
  n_content: "",
  n_reg: null,
  delFlag: false,
  uploadFileNames: [],
};

const host = API_SERVER_HOST;

const ModifyComponent = ({ n_num }) => {
  const [notice, setNotice] = useState(initState);
  const uploadRef = useRef();
  // 결과 모달
  const [result, setResult] = useState(null);
  // 이동용 함수
  const { moveToRead } = useCustomMove();

  useEffect(() => {
    getOne(n_num).then((data) => {
      setNotice(data);
    });
  }, [n_num]);

  const handleChangeNotice = (e) => {
    notice[e.target.name] = e.target.value;
    setNotice({ ...notice });
  };

  const deleteOldImages = (imageName) => {
    const resultFileNames = notice.uploadFileNames.filter(
      (fileName) => fileName !== imageName
    );
    notice.uploadFileNames = resultFileNames;
    setNotice({ ...notice });
  };

  const handleClickModify = () => {
    const files = uploadRef.current.files;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    formData.append("n_head", notice.n_head);
    formData.append("n_title", notice.n_title);
    formData.append("n_content", notice.n_content);
    formData.append("delFlag", notice.delFlag);

    for (let i = 0; i < notice.uploadFileNames.length; i++) {
      formData.append("uploadFileNames", notice.uploadFileNames[i]);
    }
    if (window.confirm("수정 하시겠습니까??")) {
      alert("수정되었습니다.");
      putOne(n_num, formData).then((data) => {
        setResult("Modified");
        moveToRead(n_num);
      });
    }
  };

  const handleClickCancel = () => {
    if (window.confirm("취소 하시겠습니까??")) {
      alert("취소되었습니다.");
      moveToRead(n_num);
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
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-me"
            name="n_title"
            type={"text"}
            value={notice.n_title}
            onChange={handleChangeNotice}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">내용</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-me"
            name="n_content"
            type={"text"}
            value={notice.n_content}
            onChange={handleChangeNotice}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">파일추가등록</div>
          <label
            className="input-file-button inline-block rounded p-2 m-10 text-center center text-xl w-32 text-white bg-yellow-300"
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
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">첨부파일</div>
          <div className="w-4/5 justify-center flex flex-wrap items-start">
            {notice.uploadFileNames.map((imgFile, i) => (
              <div className="flex justify-center flex-col w-1/3" key={i}>
                <button
                  className="bg-orange-300 text-3xl text-white"
                  onClick={() => deleteOldImages(imgFile)}
                >
                  삭제하기
                </button>
                <img alt="img" src={`${host}/api/notice/view/s_${imgFile}`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end p-2">
        <button
          type="button"
          className="inline-block rounded p-2 m-2 text-xl w-32 text-white bg-blue-400"
          onClick={handleClickModify}
        >
          수정완료
        </button>
        <button
          type="button"
          className="inline-block rounded p-2 m-2 text-xl w-32 text-white bg-red-400"
          onClick={handleClickCancel}
        >
          취소
        </button>
      </div>
    </div>
  );
};
export default ModifyComponent;
