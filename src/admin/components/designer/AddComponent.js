import { useRef, useState } from "react";
import { postAdd } from "../../../common/api/designerApi";
import FetchingModal from "../../../common/components/FetchingModal";
import ResultModal from "../../../common/components/ResultModal";
import useCustomMove from "../../../common/hooks/useCustomMove";

// 초기 상태 정의
const initState = {
  dname: "",
  dbirth: "",
  dgender: 1,
  dphone: "",
  demail: "",
  dh_date: "",
  dstate: 0,
  dintro: "",
  dattach: [],
};

const AddComponent = () => {
  // 상태 및 참조 변수 선언
  const [designer, setDesigner] = useState({ ...initState });
  const uploadRef = useRef(null); // useRef로 uploadRef 정의
  const { moveToList } = useCustomMove();

  //모달
  const [fetching, setFetching] = useState(false);
  const [result, setResult] = useState(null);

  // 입력값 변경 이벤트 처리
  const handleChangeDesigner = (e) => {
    const { name, value } = e.target;
    setDesigner({ ...designer, [name]: value });
  };

  //radio버튼 사용하는 성별값을 문자열에서 정수로 변환
  const handleChangeDesigner1 = (e) => {
    const { name, value } = e.target;
    setDesigner((prevDesigner) => ({
      ...prevDesigner,
      [name]: name === "dgender" ? parseInt(value, 10) : value,
    }));
  };

  //radio버튼 사용하는 근무상태값을 문자열에서 정수로 변환
  const handleChangeDesigner2 = (e) => {
    const { name, value } = e.target;
    setDesigner((prevDesigner) => ({
      ...prevDesigner,
      [name]: name === "dstate" ? parseInt(value, 10) : value,
    }));
  };

  //첨부파일명에 저장
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const fileNames = files.map((file) => file.name);
    setDesigner({ ...designer, dattach: fileNames });
  };

  // 추가 버튼 클릭 이벤트 처리
  const handleClickAdd = (e) => {
    e.preventDefault(); // 기본 동작 방지
    const formData = new FormData();
    formData.append("file", uploadRef.current.files[0]); // 첫 번째 파일만 업로드

    // 디자이너 정보 추가
    for (const key in designer) {
      formData.append(key, designer[key]);
    }

    setFetching(true);

    postAdd(formData)
      .then((data) => {
        setFetching(false);
        setResult(data.result);
      })
      .catch((error) => {
        console.error("Error adding designer:", error);
        setFetching(false);
      });
  };

  const closeModal = () => {
    setResult(null);
    moveToList({ page: 1 });
  };

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      {fetching ? <FetchingModal /> : <></>}
      {result ? (
        <ResultModal
          title={"Designer Add Result"}
          content={`${result}번 등록 완료`}
          callbackFn={closeModal}
        />
      ) : (
        <></>
      )}
      {/* 추가 버튼 */}
      <div className="flex justify-end">
        <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
          <button
            type="button"
            className="rounded p-4 w-36 bg-blue-500 text-xl text-white "
            onClick={handleClickAdd}
          >
            등록
          </button>
        </div>
      </div>

      {/* 디자이너 정보 입력 폼 */}
      {Object.keys(initState).map((key) => (
        <div key={key} className="flex justify-center">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-1/5 p-6 text-right font-bold">{key}</div>
            {key === "dgender" ? (
              <div className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md">
                <label>
                  <input
                    type="radio"
                    name={key}
                    value={0}
                    checked={designer[key] === 0}
                    onChange={handleChangeDesigner1}
                  />
                  남자
                </label>
                <label>
                  <input
                    type="radio"
                    name={key}
                    value={1}
                    checked={designer[key] === 1}
                    onChange={handleChangeDesigner1}
                  />
                  여자
                </label>
              </div>
            ) : key === "dstate" ? (
              <div className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md">
                <label>
                  근무
                  <input
                    type="radio"
                    name={key}
                    value={0}
                    checked={designer[key] === 0}
                    onChange={handleChangeDesigner2}
                  />
                </label>
                <label>
                  퇴사
                  <input
                    type="radio"
                    name={key}
                    value={1}
                    checked={designer[key] === 1}
                    onChange={handleChangeDesigner2}
                  />
                </label>
              </div>
            ) : key === "dbirth" || key === "dh_date" ? (
              <input
                className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                name={key}
                type="date"
                value={designer[key]}
                onChange={handleChangeDesigner}
              />
            ) : key === "dintro" ? (
              <textarea
                className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                name={key}
                rows={4} // 4줄로 지정
                value={designer[key]}
                onChange={handleChangeDesigner}
              />
            ) : (
              <input
                className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                name={key}
                type={key === "dgender" ? "number" : "text"}
                value={designer[key]}
                onChange={handleChangeDesigner}
              />
            )}
          </div>
        </div>
      ))}
      {/* 파일 업로드 입력 폼 */}
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">File</div>
          <input
            ref={uploadRef}
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            type="file"
            multiple={false}
            onChange={handleFileChange} // 파일 변경 시 이벤트 핸들러 추가
          />
        </div>
      </div>
    </div>
  );
};

export default AddComponent;
