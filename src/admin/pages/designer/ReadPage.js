import { useCallback } from "react";
import { createSearchParams, useNavigate, useParams, useSearchParams } from "react-router-dom";
import ReadComponent from "../../components/designer/ReadComponents";

const ReadPage = () => {

  const { dno } = useParams();
  const navigate = useNavigate();
  const [queryParams] = useSearchParams();

  const page = queryParams.get("page") ? parseInt(queryParams.get("page")) : 1;
  const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 10;

  const queryStr = createSearchParams({ page, size }).toString();
  const moveToModify = useCallback(
    (dno) => {
      navigate({
        pathname: `/designer/modify/${dno}`,
        search: queryStr,
      });
    },
    [dno, page, size]
  );

  //조회화면에서 다시 목록으로 이동하는 경우가 있어 추가하는 함수
const moveToList = useCallback(() => {
  navigate({ pathname: `/designer/list`, search: queryStr });
}, [page, size]);


  return (
    <div className="font-extrabold w-full bg-white mt-6">
      <div className="text-2xl ">Todo Read Page Component {dno}</div>
      <ReadComponent dno={dno}></ReadComponent>
    </div>
  );
};

export default ReadPage;
