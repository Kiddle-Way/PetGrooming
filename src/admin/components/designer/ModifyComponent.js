import { useEffect, useRef, useState } from "react";
import { getOne, putOne, deleteOne } from "../../../common/api/designerApi";
import FetchingModal from "../../../common/components/FetchingModal";
import ResultModal from "../../../common/components/ResultModal";
import { API_SERVER_HOST } from "../../../common/api/productApi";
import useCustomMove from "../../../common/hooks/useCustomMove";

const initState = {
  dno: 0,
  dname: "",
  dgender: 0,
  demail: "",
  dphone: "",
  dstate: 0,
  dintro: "",
  dbirth: "",
  dh_date: "",
  dattach: [],
  delFlag: false,
};

const host = API_SERVER_HOST;

const ModifyComponent = ({ dno }) => {
  const [designer, setDesigner] = useState(initState);
  const [dattach, setDattach] = useState([]); // 파일 이름을 저장할 상태 추가
  const uploadRef = useRef(null); // useRef로 uploadRef 정의

  // 결과 모달
  const [result, setResult] = useState(null);

  // 이동용 함수
  const { moveToRead, moveToList } = useCustomMove();
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);

    getOne(dno).then((data) => {
      setDesigner(data);
      setFetching(false);
    });
  }, [dno]);

  // 입력값 변경 이벤트 처리
  const handleChangeDesigner = (e) => {
    setDesigner({ ...designer, [e.target.name]: e.target.value });
  };

  // radio버튼 사용하는 성별값을 문자열에서 정수로 변환
  const handleChangeDesigner1 = (e) => {
    const { name, value } = e.target;
    setDesigner((prevDesigner) => ({
      ...prevDesigner,
      [name]: name === "dgender" ? parseInt(value, 10) : value,
    }));
  };

  // radio버튼 사용하는 근무상태값을 문자열에서 정수로 변환
  const handleChangeDesigner2 = (e) => {
    const { name, value } = e.target;
    setDesigner((prevDesigner) => ({
      ...prevDesigner,
      [name]: name === "dstate" ? parseInt(value, 10) : value,
    }));
  };

  // 첨부된 파일명 설정
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const fileNames = files.map((file) => file.name);
    setDattach([...dattach, ...fileNames]); // 이전 파일명과 새로운 파일명 합쳐서 업데이트
  };

  // 삭제할 이미지 처리
  const deleteOldImages = (imageName) => {
    const resultFileNames = designer.uploadFileNames.filter(
      (fileName) => fileName !== imageName
    );
    setDesigner((prevDesigner) => ({
      ...prevDesigner,
      uploadFileNames: resultFileNames,
    }));
  };

  // 수정 버튼 클릭 이벤트 처리
  const handleClickModify = () => {
    const files = uploadRef.current.files;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    // other data
    formData.append("dname", designer.dname);
    formData.append("dbirth", designer.dbirth);
    formData.append("dgender", designer.dgender);
    formData.append("dphone", designer.dphone);
    formData.append("demail", designer.demail);
    formData.append("dh_date", designer.dh_date);
    formData.append("dstate", designer.dstate);
    formData.append("dintro", designer.dintro);
    formData.append("dattach", designer.dattach);
    formData.append("dattach", dattach.join(",")); // 수정된 부분

    // dattach 업로드
    //for (let i = 0; i < dattach.length; i++) {
    //formData.append("dattach", dattach[i]);
    //}

    // uploading 처리
    setFetching(true);

    putOne(dno, formData).then((data) => {
      // 수정 처리
      setResult("Modified");
      setFetching(false);
    });
  };

  //삭제
  const handleClickDelete = () => {
    setFetching(true);
    deleteOne(dno).then((data) => {
      setResult("Deleted");
      setFetching(false);
    });
  };
  //모달 닫기
  const closeModal = () => {
    if (result === "Modified") {
      moveToRead(dno); // 조회    화면으로    이동
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
          content={"정상적으로 처리되었습니다."} // 결과 모달창
          callbackFn={closeModal}
        />
      ) : (
        <></>
      )}
      {/* 수정 및 취소 버튼 */}
      <div className="flex justify-end p-4">
        <button
          type="button"
          className="text-white bg-gradient-to-br from-blue-500 to-purple-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={moveToList}
        >
          리스트
        </button>

        <button
          type="button"
          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={handleClickModify}
        >
          수정
        </button>

        <button
          type="button"
          className="text-white bg-gradient-to-br from-blue-500 to-purple-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={handleClickDelete}
        >
          삭제
        </button>
      </div>
      {/* 입력 폼들 */}
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">이름</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="dname"
            type={"text"}
            value={designer.dname}
            onChange={handleChangeDesigner}
          ></input>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">생년월일</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="dbirth"
            type={"date"}
            value={designer.dbirth}
            onChange={handleChangeDesigner}
          ></input>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">성별</div>
          <div className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md">
            <label>
              <input
                type="radio"
                name="dgender"
                value={0}
                checked={designer.dgender === 0}
                onChange={handleChangeDesigner1}
              />
              남자
            </label>
            <label>
              <input
                type="radio"
                name="dgender"
                value={1}
                checked={designer.dgender === 1}
                onChange={handleChangeDesigner1}
              />
              여자
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">연락처</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="dphone"
            type={"text"}
            value={designer.dphone}
            onChange={handleChangeDesigner}
          ></input>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">이메일</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="demail"
            type={"email"}
            value={designer.demail}
            onChange={handleChangeDesigner}
          ></input>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">입사일</div>
          <input
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            name="dh_date"
            type={"date"}
            value={designer.dh_date}
            onChange={handleChangeDesigner}
          ></input>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">상태</div>
          <div className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md">
            <label>
              <input
                type="radio"
                name="dstate"
                value={0}
                checked={designer.dstate === 0}
                onChange={handleChangeDesigner2}
              />
              근무
            </label>
            <label>
              <input
                type="radio"
                name="dstate"
                value={1}
                checked={designer.dstate === 1}
                onChange={handleChangeDesigner2}
              />
              퇴사
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">소개</div>
          <textarea
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-
300 shadow-md resize-y"
            name="dintro"
            rows="4"
            onChange={handleChangeDesigner}
            defaultValue={designer.dintro}
          ></textarea>
        </div>
      </div>
      {/* 파일 업로드 입력 폼 */}
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Files</div>
          <input
            ref={uploadRef}
            className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
            type={"file"}
            multiple={false}
            onChange={handleFileChange}
          ></input>
        </div>
      </div>

      {/* 업로드된 이미지 표시 */}
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Images</div>
          <div className="w-4/5 justify-center flex flex-wrap items-start">
            {dattach.map((imgFile, i) => (
              <div className="flex justify-center flex-col w-1/3" key={i}>
                <button
                  className="bg-blue-500 text-3xl text-white"
                  onClick={() => deleteOldImages(imgFile)}
                >
                  DELETE
                </button>

                <img alt="img" src={`${host}/api/designer/view/s_${imgFile}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModifyComponent;
