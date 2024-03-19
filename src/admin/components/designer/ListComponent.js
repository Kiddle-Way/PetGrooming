import { useEffect, useState } from "react";
import { getList } from "../../../common/api/designerApi";
import useDesignMove from "../../../common/hooks/useDesignMove";
import FetchingModal from "../../../common/components/FetchingModal";
import { API_SERVER_HOST } from "../../../common/api/productApi";
import PageComponent from "../../../common/components/PageComponent";

const host = API_SERVER_HOST;

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totoalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
};

const ListComponent = () => {
  const { page, size, refresh, moveToList, moveToRead, moveToAdd } =
    useDesignMove();

  //serverData 는    나중에   사용
  const [serverData, setServerData] = useState(initState);

  //for FetchingModal
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);

    getList({ page, size }).then((data) => {
      console.log(data);
      setServerData(data);
      setFetching(false);
    });
  }, [page, size, refresh]);

  const handleStatusChange = (designer, isResign) => {
    const updatedDesigner = { ...designer, dstate: isResign ? "1" : "0" };
    // 여기에서 updatedDesigner를 이용하여 디자이너 상태 업데이트 로직을 호출
    // 예: updateDesignerStatus(updatedDesigner);
  };

  return (
    <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
      {fetching ? <FetchingModal /> : <></>}

      <div className="flex justify-end p-4">
        <button
          type="button"
          className="inline-block rounded p-4 m-2 text-xs w-20 text-white bg-red-500"
          onClick={moveToAdd}
        >
          등록
        </button>
      </div>

      <div className="flex flex-wrap mx-auto p-6">
        <table className="w-full">
          <thead>
            <tr className="border-b-2">
              <th className="p-2">번호</th>
              <th className="p-2">이름</th>
              <th className="p-2">생년월일</th>
              <th className="p-2">성별</th>
              <th className="p-2">휴대폰번호</th>
              <th className="p-2">이메일</th>
              <th className="p-2">입사일</th>
              <th className="p-2">상태</th>
              <th className="p-2">소개</th>
              <th className="p-2">사진</th>
              <th className="p-2">복직/퇴사</th>
            </tr>
          </thead>
          <tbody>
            {serverData.dtoList.map((designer) => (
              <tr key={designer.dno} className="border-b">
                <td className="p-2">{designer.dno}</td>
                <td className="p-2" onClick={() => moveToRead(designer.dno)}>
                  {designer.dname}
                </td>
                <td className="p-2">{designer.dbirth}</td>
                <td className="p-2">
                  {designer.dgender === 1 ? "여자" : "남자"}
                </td>
                <td className="p-2">{designer.dphone}</td>
                <td className="p-2">{designer.demail}</td>
                <td className="p-2">{designer.dh_date}</td>
                <td className="p-2">
                  {designer.dstate === 0 ? "근무" : "퇴사"}
                </td>
                <td className="p-2">{designer.dintro}</td>
                <td className="p-2">
                  {designer.uploadFileNames.length > 0 ? (
                    <span className="text-green-500">O</span>
                  ) : (
                    <span className="text-red-500">X</span>
                  )}
                </td>
                <td className="p-2">
                  {designer.dstate === 0 ? (
                    <button
                      className="p-2 rounded border border-solid border-neutral-300 bg-blue-500 text-white"
                      onClick={() => handleStatusChange(designer, true)}
                      disabled={false}
                    >
                      퇴사
                    </button>
                  ) : (
                    <button
                      className="p-2 rounded border border-solid border-neutral-300 bg-green-500 text-white"
                      onClick={() => handleStatusChange(designer, false)}
                      disabled={false}
                    >
                      복직
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PageComponent
        serverData={serverData}
        movePage={moveToList}
      ></PageComponent>
    </div>
  );
};

export default ListComponent;
