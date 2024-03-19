import { useEffect, useState } from "react";
import { getSearch, getList } from "../../../common/api/designerApi";
import useCustomMove from "../../../common/hooks/useCustomMove";
import PageComponent from "../../../common/components/PageComponent";
import { Link } from "react-router-dom";

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
  const { page, size, moveToList, refresh, moveToRead } = useCustomMove();
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 state 추가
  const [serverData, setServerData] = useState(initState);
  const [isSearched, setIsSearched] = useState(false); // 검색 여부를 저장하는 상태 추가

  const handleSearchClick = async () => {
    const pageParam = { page: 1, size: 10 };
    const data = await getSearch(searchTerm, pageParam);
    setServerData(data);
    setIsSearched(true); // 검색 버튼을 클릭하면 isSearched를 true로 설정
    moveToList(1, size); // 검색 버튼 클릭 시 항상 첫 페이지로 이동하도록 설정
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };


  useEffect(() => {
    const fetchData = async () => {
      // 검색어가 있다면 검색어가 포함된 상품 목록 출력
      if (isSearched) {
        const data = await getSearch(searchTerm, { page, size });
        setServerData(data);
        // 검색어가 없다면 전체 상품 목록
      } else {
        const data = await getList({ page, size });
        setServerData(data);
      }
    };
    fetchData();
  }, [page, size, refresh, isSearched]);

  //복직/퇴직 버튼
  const handleStatusChange = (designer, isResign) => {
    const updatedDesigner = { ...designer, dstate: isResign ? "1" : "0" };
    // 여기에서 updatedDesigner를 이용하여 디자이너 상태 업데이트 로직을 호출
    // 예: updateDesignerStatus(updatedDesigner);
    // 예시로 콘솔에 변경된 디자이너 정보를 출력합니다.
    console.log("변경된 디자이너 정보:", updatedDesigner);
  };

  return (
    <div>
      <div className="flex mx-auto justify-end p-6">
        <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-bold text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
          <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            <Link to="/designer/add">디자이너 등록</Link>
          </span>
        </button>
      </div>

      

      <div className="border-2 border-blue-100 mt-1 mr-2 ml-2">
      {/* 검색어 입력창 */}
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange} // 검색어 변경 처리
        placeholder="검색어를 입력하세요"
      />
      <button
        className="ml-2 p-2 bg-blue-500 text-white rounded-md"
        onClick={handleSearchClick}
      >
        검색
      </button>


      {/* 디자이너 목록 */}
      <div className="flex flex-wrap mx-auto justify-center p-6">
        <div className="w-full min-w-[400px] p-2 m-2 rounded shadow-md text-gray-800 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium text-sm px-5 py-2.5 text-center me-2 mb-2">
          <div className="flex">
            <div className="text-sm m-1 p-2 w-2/12 font-extrabold text-center">
              번호
            </div>
            <div className="text-1xl m-1 p-2 w-4/12 font-extrabold text-center">
              이름
            </div>
            <div className="text-1xl m-1 p-2 w-4/12 font-extrabold text-center">
              생년월일
            </div>
            <div className="text-1xl m-1 p-2 w-4/12 font-extrabold text-center">
              성별
            </div>
            <div className="text-1xl m-1 p-2 w-4/12 font-extrabold text-center">
              휴대폰번호
            </div>
            <div className="text-1xl m-1 p-2 w-4/12 font-extrabold text-center">
              이메일
            </div>
            <div className="text-1xl m-1 p-2 w-4/12 font-extrabold text-center">
              입사일
            </div>
            <div className="text-1xl m-1 p-2 w-4/12 font-extrabold text-center">
              상태
            </div>
            <div className="text-1xl m-1 p-2 w-4/12 font-extrabold text-center">
              소개
            </div>
            <div className="text-1xl m-1 p-2 w-4/12 font-extrabold text-center">
              복직/퇴사
            </div>
          </div>
        </div>

        {serverData.dtoList.map((designer) => (
          <div
            key={designer.dno}
            className="w-full p-2 rounded shadow-md cursor-pointer"
            onClick={() => moveToRead(designer.dno)}
          >
            <div className="flex">
              <div className="text-sm w-2/12 p-2 m-1 font-medium text-center">
                {designer.dno}
              </div>
              <div
                className="text-sm w-4/12 p-2 m-1 font-medium text-center"
                onClick={() => moveToRead(designer.dno)}
              >
                {designer.dname}
              </div>
              <div className="text-sm w-4/12 p-2 m-1 font-medium text-center">
                {designer.dbirth}
              </div>
              <div className="text-sm w-4/12 p-2 m-1 font-medium text-center">
                {designer.dgender === 1 ? "여자" : "남자"}
              </div>
              <div className="text-sm w-4/12 p-2 m-1 font-medium text-center">
                {designer.dphone}
              </div>
              <div className="text-sm w-4/12 p-2 m-1 font-medium text-center">
                {designer.demail}
              </div>
              <div className="text-sm w-4/12 p-2 m-1 font-medium text-center">
                {designer.dh_date}
              </div>
              <div className="text-sm w-4/12 p-2 m-1 font-medium text-center">
                {designer.dstate === 0 ? "근무" : "퇴사"}
              </div>
              <div className="text-sm w-4/12 p-2 m-1 font-medium text-center">
                {designer.dintro}
              </div>

              <div className="text-sm w-4/12 p-2 m-1 font-medium text-center">
                {designer.dstate === 0 ? (
                  <button
                    className="p-1 rounded border border-solid border-neutral-300 bg-blue-500 text-white"
                    onClick={() => handleStatusChange(designer, true)}
                    disabled={false}
                  >
                    {/* //   근무중일땐 퇴사버튼 활성화 */}
                    퇴사
                  </button>
                ) : (
                  <button
                    className="p-1 rounded border border-solid border-neutral-300 bg-green-500 text-white"
                    onClick={() => handleStatusChange(designer, false)}
                    disabled={false}
                  >
                    {/* //   퇴사일땐 복직버튼 활성화 */}
                    복직
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        </div>
        </div>
      <PageComponent
        serverData={serverData}
        movePage={moveToList}
      ></PageComponent>
    </div>
  );
};

export default ListComponent;
