import {  useNavigate } from "react-router-dom";
import BasicLayout from "../BasicLayout";
import { useCallback } from "react";

const IndexPage = () => {
  const navigate = useNavigate();

  const handleClickList = useCallback(() => {
    navigate({ pathname: "list" });
  });

  const handleClickAdd = useCallback(() => {
    navigate({ pathname: "add" });
  });

    const handleClickDelete = useCallback(() => {
    navigate({ pathname: "delete" });
  });

  return (
    <BasicLayout>
      <div className="w-full flex m-2 p-2 ">
        <div
          className="text-xl m-1 p-2 w-20 font-extrabold text-center underline"
          onClick={handleClickList}
        >
          디자이너관리
        </div>

        <div
          className="text-xl m-1 p-2 w-20 font-extrabold text-center underline"
          onClick={handleClickAdd}
        >
          디자이너 등록
        </div>

        <div
          className="text-xl m-1 p-2 w-20 font-extrabold text-center underline"
          onClick={handleClickDelete}
        >
          디자이너 삭제
        </div>
      </div>
    </BasicLayout>
  );
};
export default IndexPage;
