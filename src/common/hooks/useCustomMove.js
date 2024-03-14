import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useState } from "react";

const getNum = (param, defaultValue) => {
  if (!param) {
    return defaultValue;
  }
  return parseInt(param);
};

const useCustomMove = () => {
  const [refresh, setRefresh] = useState(false); // refresh 상태 추가
  const navigate = useNavigate();
  const [queryParams] = useSearchParams();
  const page = getNum(queryParams.get("page"), 1);
  const size = getNum(queryParams.get("size"), 10);
  const queryDefault = createSearchParams({ page, size }).toString(); //새로 추가
  const moveToList = (pageParam) => {
    let queryStr = "";

    if (pageParam) {
      const pageNum = getNum(pageParam.page, page);
      const sizeNum = getNum(pageParam.size, size);

      queryStr = createSearchParams({
        page: pageNum,
        size: sizeNum,
      }).toString();
    } else {
      queryStr = queryDefault;
    }

    navigate({
      pathname: `../list`,
      search: queryStr,
    });

    setRefresh(!refresh); //추가
  };

  const moveToModify = (num) => {
    console.log(queryDefault);

    navigate({
      pathname: `../modify/${num}`,
      search: queryDefault, // 수정시에 기존의 쿼리 스트링 유지를 위해
    });
  };

  const moveToRead = (num) => {
    console.log(queryDefault);
    navigate({
      pathname: `../read/${num}`,
      search: queryDefault,
    });
  };

  return { moveToList, moveToModify, moveToRead, page, size, refresh };
};

export default useCustomMove;
