import { useEffect, useRef, useState } from "react";
import { getOne, putOne, deleteOne } from "../../../common/api/inquiryApi";
import { API_SERVER_HOST } from "../../../common/api/noticeApi";
import useCustomMove from "../../../common/hooks/useCustomMove";
import FetchingModal from "../../../common/components/FetchingModal";
import ResultModal from "../../../common/components/ResultModal";

const initState = {
  i_num: 0,
  i_pw: 0,
  i_title: "",
  i_content: "",
  i_a_content: "",
  i_uploadFileNames: [],
  i_delFlag: false,
};

const host = API_SERVER_HOST;

const ModifyComponent = ({ i_num }) => {
  const [inquiry, setInquiry] = useState(initState);
  const [fetching, setFetching] = useState(false);
  const uploadRef = useRef();
  //결과 모달
  const [result, setResult] = useState(null);
  //이동용 함수
  const { moveToRead, moveToList } = useCustomMove();

  useEffect(() => {
    setFetching(true);
    getOne(i_num).then((data) => {
      setInquiry(data);
      setFetching(false);
    });
  }, [i_num]);

  const handleChangeInquiry = (e) => {
    inquiry[e.target.name] = e.target.value;
    setInquiry({ ...inquiry });
  };

  const deleteOldImages = (imageName) => {
    const resultFileNames = inquiry.i_uploadFileNames.filter(
      (fileName) => fileName !== imageName
    );
    inquiry.i_uploadFileNames = resultFileNames;
    setInquiry({ ...inquiry });
  };

  const handleClickModify = () => {
    const files = uploadRef.current.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("i_files", files[i]);
    }
    //other data
    formData.append("i_title", inquiry.i_title);
    formData.append("i_pw", inquiry.i_pw);
    formData.append("i_content", inquiry.i_content);
    formData.append("i_a_content", inquiry.i_a_content);
    for (let i = 0; i < inquiry.i_uploadFileNames.length; i++) {
      formData.append("i_uploadFileNames", inquiry.i_uploadFileNames[i]);
    }
    //fetching
    setFetching(true);
    putOne(i_num, formData).then((data) => {
      //수정 처리
      setResult("Modified");
      setFetching(false);
    });
  };

  const handleClickDelete = () => {
    setFetching(true);
    deleteOne(i_num).then((data) => {
      setResult("Deleted");
      setFetching(false);
    });
  };

  const closeModal = () => {
    if (result === "Modified") {
      moveToRead(i_num); // 조회 화면으로 이동
    } else if (result === "Deleted") {
      moveToList({ page: 1 });
    }
    setResult(null);
  };

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      {fetching ? <FetchingModal /> : <></>}
      {result ? (
        <ResultModal
          title={`${result}`}
          content={"정상적으로 처리되었습니다."} //결과 모달창
          callbackFn={closeModal}
        />
      ) : (
        <></>
      )}
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">문의 제목</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="i_title"
            type={"text"}
            value={inquiry.i_title}
            onChange={handleChangeInquiry}
          ></input>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">비밀번호</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="i_pw"
            type={"password"}
            value={inquiry.i_pw}
            onChange={handleChangeInquiry}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">문의 내용</div>
          <textarea
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md resize-y"
            name="i_content"
            rows="10"
            onChange={handleChangeInquiry}
            value={inquiry.i_content}
          >
            {inquiry.i_content}
          </textarea>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">문의 사진</div>
          <input
            ref={uploadRef}
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            type={"file"}
            multiple={true}
          ></input>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Images</div>
          <div className="w-4/5 justify-center flex flex-wrap items-start">
            {inquiry.i_uploadFileNames.map((imgFile, i) => (
              <div className="flex justify-center flex-col w-1/3" key={i}>
                <button
                  className="bg-blue-500 text-3xl text-white"
                  onClick={() => deleteOldImages(imgFile)}
                >
                  DELETE
                </button>
                <img alt="img" src={`${host}/api/inquiry/view/${imgFile}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-end p-4">
        <button
          type="button"
          className="rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
          onClick={handleClickDelete}
        >
          Delete
        </button>
        <button
          type="button"
          className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-orange-500"
          onClick={handleClickModify}
        >
          Modify
        </button>
        <button
          type="button"
          className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
        >
          List
        </button>
      </div>
    </div>
  );
};
export default ModifyComponent;
