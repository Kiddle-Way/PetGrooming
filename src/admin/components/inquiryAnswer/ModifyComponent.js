import { useEffect, useState } from "react";
import { getOne, putOne } from "../../../common/api/inquiryAnswerApi";
import { API_SERVER_HOST } from "../../../common/api/noticeApi";
import useCustomMove from "../../../common/hooks/useCustomMove";

const initState = {
  i_num: 0,
  m_num: 0,
  i_pw: 0,
  i_title: "",
  i_content: "",
  i_a_content: "",
  i_uploadFileNames: [],
  v_delFlag: false,
};

const host = API_SERVER_HOST;

const ModifyComponent = ({ i_num }) => {
  const [inquiry, setinquiry] = useState(initState);
  const { moveToRead } = useCustomMove();

  useEffect(() => {
    getOne(i_num).then((data) => {
      setinquiry(data);
    });
  }, [i_num]);

  const handleChangeInquiry = (e) => {
    inquiry[e.target.name] = e.target.value;
    setinquiry({ ...inquiry });
  };

  const handleClickModify = () => {
    const formData = new FormData();

    formData.append("i_title", inquiry.i_title);
    formData.append("i_pw", inquiry.i_pw);
    formData.append("i_content", inquiry.i_content);
    formData.append("i_a_content", inquiry.i_a_content);
    for (let i = 0; i < inquiry.i_uploadFileNames.length; i++) {
      formData.append("i_uploadFileNames", inquiry.i_uploadFileNames[i]);
    }
    putOne(i_num, formData).then((data) => {
      setinquiry(data);
      moveToRead(i_num);
    });
  };

  const handleClickCancel = () => {
    if (window.confirm("취소 하시겠습니까??")) {
      alert("취소되었습니다.");
      moveToRead(i_num);
    }
  };

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">문의 제목</div>
          <div className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md">
            {inquiry.i_title}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">문의 내용</div>
          <div className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md">
            {inquiry.i_content}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">첨부파일</div>
          <div className="w-4/5 justify-center flex flex-wrap items-start">
            {inquiry.i_uploadFileNames.map((imgFile, i) => (
              <div className="flex justify-center flex-col w-1/3" key={i}>
                <img alt="img" src={`${host}/api/review/view/${imgFile}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">리뷰 답변</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="i_a_content"
            type={"text"}
            value={inquiry.i_a_content}
            onChange={handleChangeInquiry}
          ></input>
        </div>
      </div>
      <div className="flex justify-end p-4">
        <button
          type="button"
          className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
          onClick={handleClickModify}
        >
          수정하기
        </button>
        <button
          type="button"
          className="rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
          onClick={handleClickCancel}
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default ModifyComponent;
