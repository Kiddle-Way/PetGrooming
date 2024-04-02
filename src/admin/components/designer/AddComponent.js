import { useRef, useState } from "react";
import { postAdd } from "../../../common/api/designerApi";
import useCustomMove from "../../../common/hooks/useCustomMove";

// 초기 상태 정의
const initState = {
  d_name: "",
  d_birth: "",
  d_gender: "",
  d_phone: "",
  d_email: "",
  d_h_date: "",
  d_state: 0,
  d_intro: "",
  d_files: [],
};

const AddComponent = () => {
  // 상태 및 참조 변수 선언
  const [designer, setDesigner] = useState({ ...initState });
  const uploadRef = useRef(null); // useRef로 uploadRef 정의
  const [result, setResult] = useState(null);

  const { moveToList } = useCustomMove();

  // 입력값 변경 이벤트 처리
  const handleChangeDesigner = (e) => {
    designer[e.target.name] = e.target.value;
    setDesigner({ ...designer });
  };

  // 추가 버튼 클릭 이벤트 처리
  const handleClickAdd = (e) => {
    const files = uploadRef.current.files;

    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("d_files", files[i]);
    }

    //other data
    formData.append("d_name", designer.d_name);
    formData.append("d_birth", designer.d_birth);
    formData.append("d_gender", designer.d_gender);
    formData.append("d_phone", designer.d_phone);
    formData.append("d_email", designer.d_email);
    formData.append("d_h_date", designer.d_h_date);
    formData.append("d_state", designer.d_state);
    formData.append("d_intro", designer.d_intro);
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

  const handleGenderChange = (e) => {
    const { value } = e.target;
    setDesigner((prevState) => ({
      ...prevState,
      d_gender: value === "male" ? 0 : 1,
    }));
  };

  return (
    <div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">이름</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
            name="d_name"
            type={"text"}
            value={designer.d_name}
            onChange={handleChangeDesigner}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="realative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">생년월일</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
            name="d_birth"
            type={"date"}
            value={designer.d_birth}
            onChange={handleChangeDesigner}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="realative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">성별</div>
          <div className="flex items-center">
            <label className="mr-2">
              남자
              <input
                type="radio"
                name="d_gender"
                value="male"
                checked={designer.d_gender === 0}
                onChange={handleGenderChange}
              />
            </label>
            <label>
              여자
              <input
                type="radio"
                name="d_gender"
                value="female"
                checked={designer.d_gender === 1}
                onChange={handleGenderChange}
              />
            </label>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="realative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">전화번호</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
            name="d_phone"
            type={"text"}
            value={designer.d_phone}
            onChange={handleChangeDesigner}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="realative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">이메일</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
            name="d_email"
            type={"text"}
            value={designer.d_email}
            onChange={handleChangeDesigner}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="realative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">입사일</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
            name="d_h_date"
            type={"date"}
            value={designer.d_h_date}
            onChange={handleChangeDesigner}
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="realative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">소개</div>
          <textarea
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
            name="d_intro"
            value={designer.d_intro}
            onChange={handleChangeDesigner}
            rows={8} // 여러 줄을 입력할 수 있도록 rows 속성 추가
          ></textarea>
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
            className="text-white bg-gradient-to-br from-blue-500 to-purple-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={handleClickAdd}
          >
            등록
          </button>
        </div>
        <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
          <button
            type="button"
            className="text-white bg-gradient-to-br from-blue-500 to-purple-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
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
