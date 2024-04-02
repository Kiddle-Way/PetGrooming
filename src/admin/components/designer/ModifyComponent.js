import { useEffect, useRef, useState } from "react";
import { getOne, putOne } from "../../../common/api/designerApi";
import useCustomMove from "../../../common/hooks/useCustomMove";

const initState = {
  d_num: 0,
  d_name: "",
  d_gender: 0,
  d_email: "",
  d_phone: "",
  d_state: 0,
  d_intro: "",
  d_birth: "",
  d_h_date: "",
  d_uploadFileNames: [],
};

const host = "http://localhost:8080";

const ModifyComponent = ({ d_num }) => {
  const [designer, setDesigner] = useState(initState);
  const uploadRef = useRef();

  const [result, setResult] = useState(null);

  const { moveToRead } = useCustomMove();

  useEffect(() => {
    getOne(d_num).then((data) => {
      setDesigner(data);
    });
  }, [d_num]);

  const handleChangeDesigner = (e) => {
    designer[e.target.name] = e.target.value;
    setDesigner({ ...designer });
  };

  const deleteOldImages = (imageName) => {
    const resultFileNames = designer.d_uploadFileNames.filter(
      (fileName) => fileName !== imageName
    );
    designer.d_uploadFileNames = resultFileNames;
    setDesigner({ ...designer });
  };

  // 추가 버튼 클릭 이벤트 처리
  const handleClickModify = (e) => {
    if (
      designer.d_name === "" ||
      designer.d_birth === "" ||
      designer.d_gender === "" ||
      designer.d_phone === "" ||
      designer.d_email === "" ||
      designer.d_h_date === "" ||
      designer.d_intro === ""
    ) {
      alert("모든 입력란을 입력해주세요.");
      return;
    }

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
    for (let i = 0; i < designer.d_uploadFileNames.length; i++) {
      formData.append("d_uploadFileNames", designer.d_uploadFileNames[i]);
    }
    console.log(formData);

    if (window.confirm("등록 하시겠습니까??")) {
      alert("등록되었습니다.");
      putOne(d_num, formData).then((data) => {
        setResult(data.RESULT);
        moveToRead(d_num);
      });
    }
  };

  const handleClickCancel = () => {
    if (window.confirm("취소 하시겠습니까??")) {
      alert("취소되었습니다.");
      moveToRead(d_num);
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
          <div className="w-1/5 p-6 text-right font-bold">첨부 사진</div>
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
            {designer.d_uploadFileNames.map((imgFile, i) => (
              <div className="flex justify-center flex-col w-1/3" key={i}>
                <button
                  className="bg-blue-500 text-3xl text-white"
                  onClick={() => deleteOldImages(imgFile)}
                >
                  DELETE
                </button>
                <img alt="img" src={`${host}/api/designer/view/${imgFile}`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
          <button
            type="button"
            className="inline-block rounded p-2 m-2 text-xl w-32 text-white bg-blue-400"
            onClick={handleClickModify}
          >
            수정완료
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

export default ModifyComponent;
