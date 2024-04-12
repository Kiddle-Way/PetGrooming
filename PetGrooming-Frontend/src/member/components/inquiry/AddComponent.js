import { useRef, useState, useEffect } from "react";
import { postAdd } from "../../../common/api/inquiryApi";
import FetchingModal from "../../../common/components/FetchingModal";
import ResultModal from "../../../common/components/ResultModal";
import useCustomMove from "../../../common/hooks/useCustomMove";
import { getCookie } from "../../../common/util/cookieUtil";

const initState = {
  i_title: "",
  i_pw: "",
  i_content: "",
  i_files: [],
  m_num: "1"
};

const AddComponent = () => {
  const [inquiry, setInquiry] = useState({ ...initState });
  const uploadRef = useRef();

  const [fetching, setFetching] = useState(false);

  const [result, setResult] = useState(null);

  const {moveToList} = useCustomMove()

  useEffect(() => {
    // 컴포넌트가 마운트될 때 쿠키에서 m_num 값을 가져와서 상태로 설정
    const memberCookieValue = getCookie("member");
    if (memberCookieValue) {
      setInquiry((prevState) => ({
        ...prevState,
        m_num: memberCookieValue.m_num,
      }));
    }
  }, []); // [] 빈 배열을 전달하여 한 번만 실행되도록 설정

  const handleChangeInquiry = (e) => {
    inquiry[e.target.name] = e.target.value;
    setInquiry({ ...inquiry });
  };

  const handleClickAdd = (e) => {
    const files = uploadRef.current.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("i_files", files[i]);
    }
    //other data
    formData.append("i_title", inquiry.i_title);
    formData.append("i_pw", inquiry.i_pw);
    formData.append("i_content", inquiry.i_content);
    formData.append("m_num",inquiry.m_num)
    console.log(formData);

    setFetching(true);
    postAdd(formData).then((data) => {
      setFetching(false);
      setResult(data.result);
    });
  };

  const closeModal = () => {
    //ResultModal 종료
    setResult(null);
    moveToList({page:1})
  };

  return (
    <div className="border-2  mt-10 m-2 p-4">
      {fetching ? <FetchingModal /> : <></>}
      {result ? (
        <ResultModal
          title={"Inquiry Add Result"}
          content={`${result}번 등록 완료`}
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
            {inquiry.pdesc}
          </textarea>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">문의 사진</div>
          <input
            ref={uploadRef}
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300
  shadow-md"
            type={"file"}
            multiple={true}
          ></input>
        </div>
      </div>
      <div className="flex justify-end">
        <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
          <button
            type="button"
            className="rounded p-4 w-36 bg-blue-500 text-xl text-white "
            onClick={handleClickAdd}
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
};


export default AddComponent;
