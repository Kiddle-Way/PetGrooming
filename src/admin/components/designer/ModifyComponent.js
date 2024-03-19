import { useEffect, useRef, useState } from "react";
import { getOne, putOne } from "../../../common/api/designerApi";
import FetchingModal from "../../../common/components/FetchingModal";
import ResultModal from "../../../common/components/ResultModal";
import { API_SERVER_HOST } from "../../../common/api/productApi";
import useDesignMove from "../../../common/hooks/useDesignMove";

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
  dattach: "",
  delFlag: false,
  uploadFileNames: [],
};

const host = API_SERVER_HOST;

const ModifyComponent = ({ dno }) => {
  const [designer, setDesigner] = useState(initState);
  const uploadRef = useRef();

  //결과    모달
  const [result, setResult] = useState(null);

  //이동용   함수
  const { moveToRead, moveToList } = useDesignMove();
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);

    getOne(dno).then((data) => {
      setDesigner(data);
      setFetching(false);
    });
  }, [dno]);

  const handleChangeDesigner = (e) => {
    designer[e.target.name] = e.target.value;
    setDesigner({ ...designer });
  };

  // const handleChangeDesigner1 = (e) => {
  //   const { value } = e.target;
  //   setDesigner({ ...designer, dgender: value });
  // };

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

  const deleteOldImages = (imageName) => {
    const resultFileNames = designer.uploadFileNames.filter(
      (fileName) => fileName !== imageName
    );
    designer.uploadFileNames = resultFileNames;
    setDesigner({ ...designer });
  };

  const handleClickModify = () => {
    const files = uploadRef.current.files;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    //other data
    formData.append("dname", designer.dname);
    formData.append("dbirth", designer.dbirth);
    formData.append("dgender", designer.dgender);
    formData.append("dphone", designer.dphone);
    formData.append("demail", designer.demail);
    formData.append("dh_date", designer.dh_date);
    formData.append("dstate", designer.dstate);
    formData.append("dintro", designer.dintro);

    for (let i = 0; i < designer.uploadFileNames.length; i++) {
      formData.append("uploadFileNames", designer.uploadFileNames[i]);
    }

    //fetching
    setFetching(true);

    putOne(dno, formData).then((data) => {
      //수정    처리
      setResult("Modified");
      setFetching(false);
    });
  };

  const closeModal = () => {
    if (result === "Modified") {
      moveToRead(dno); // 조회   화면으로   이동
    }
    setResult(null);
  };

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      {fetching ? <FetchingModal /> : <></>}
      {result ? (
        <ResultModal
          title={`${result}`}
          content={"정상적으로   처리되었습니다."} //결과   모달창
          callbackFn={closeModal}
        />
      ) : (
        <></>
      )}

      <div className="flex justify-end p-4">
        <button
          type="button"
          className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-orange-500"
          onClick={handleClickModify}
        >
          {" "}
          수정{" "}
        </button>
        <button
          type="button"
          className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
        >
          취소
        </button>
      </div>

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
          >
            {designer.dintro}
          </textarea>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">Files</div>
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
            {designer.uploadFileNames.map((imgFile, i) => (
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
