import { useRef, useState } from "react";
import { postAdd } from "../../../common/api/designerApi";
import FetchingModal from "../../../common/components/FetchingModal";
import ResultModal from "../../../common/components/ResultModal";
import useDesignMove from "../../../common/hooks/useDesignMove";

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
  file: [],
};

const AddComponent = () => {
  // 상태 및 참조 변수 선언
  const [designer, setDesigner] = useState({ ...initState });
  const uploadRef = useRef();
  //모달
  const [fetching, setFetching] = useState(false);
  const [result, setResult] = useState(null);
  //이동을    위한   함수
  const { moveToList } = useDesignMove();

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
      formData.append("files", files[i]);
    }
    // 다른 데이터 추가
    formData.append("dname", designer.dname);
    formData.append("dbirth", designer.dbirth);
    formData.append("dgender", designer.dgender);
    formData.append("dphone", designer.dphone);
    formData.append("demail", designer.demail);
    formData.append("dh_date", designer.dh_date);
    formData.append("dstate", designer.dstate);
    formData.append("dintro", designer.dintro);
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
    moveToList({ page: 1 }); //모달창 닫히면 이동
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
                    value="0"
                    checked={designer[key] === "0"}
                    onChange={handleChangeDesigner}
                  />
                  남자
                </label>
                <label>
                  <input
                    type="radio"
                    name={key}
                    value="1"
                    checked={designer[key] =="1"}
                    onChange={handleChangeDesigner}
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
                    onChange={handleChangeDesigner}
                  />
                </label>
                <label>
                  퇴사
                  <input
                    type="radio"
                    name={key}
                    value={1}
                    checked={designer[key] === 1}
                    onChange={handleChangeDesigner}
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
            multiple={true}
          />
        </div>
      </div>
      {/* 추가 버튼 */}
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
