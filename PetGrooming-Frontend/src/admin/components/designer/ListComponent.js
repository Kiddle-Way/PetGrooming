import { useEffect, useState } from "react";
import {
  search,
  getList,
  updateDesignerState,
} from "../../../common/api/designerApi";
import useCustomMove from "../../../common/hooks/useCustomMove";
import PageComponent from "../../../common/components/PageComponent";

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
};

const ListComponent = () => {
  const { page, size, moveToList, refresh, moveToRead } = useCustomMove();
  const [keyword, setKeyword] = useState(""); // 검색어 상태
  const [serverData, setServerData] = useState(initState); // 서버에서 받아온 데이터 상태
  const [gender, setGender] = useState(""); // 성별 선택 상태
  const [state, setState] = useState(""); // 근무 상태 선택 상태

  // 데이터 불러오는 함수
  const fetchData = async () => {
    try {
      let data;
      if (keyword || gender || state) {
        // 검색어, 성별, 근무 상태가 존재할 경우 검색 함수 호출
        data = await search(gender, state, keyword, { page, size });
      } else {
        // 검색어, 성별, 근무 상태가 없을 경우 전체 리스트 호출
        data = await getList({ page, size });
      }
      setServerData(data); // 서버에서 받아온 데이터 설정
    } catch (error) {
      console.error("데이터를 불러오는 데 실패했습니다:", error);
    }
  };

  // 페이지, 사이즈, 새로고침, 검색어, 성별, 근무 상태 변경 시 데이터 다시 불러오기
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, size, refresh]);

  // 검색 버튼 클릭 시 실행되는 함수
  const handleSearchClick = async () => {
    try {
      await fetchData(); // fetchData 함수 내부에서 검색 조건을 고려하여 데이터 불러오기
    } catch (error) {
      console.error("검색 중 오류 발생:", error);
    }
  };

  // 검색어 입력 시 실행되는 함수
  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  // 성별 선택 시 실행되는 함수
  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  // 근무 상태 선택 시 실행되는 함수
  const handleStateChange = (e) => {
    setState(e.target.value);
  };

  // 상태 변경 함수
  const handleResignButtonClick = async (designer, event) => {
    if (window.confirm("퇴직 처리하시겠습니까?")) {
      event.preventDefault();
      try {
        await updateDesignerState(designer.d_num, true);
        console.log("Designer has been fired successfully.");
        // 퇴직 처리 후 필요한 작업 수행
        // 새로고침 실행
        fetchData(); // 데이터 다시 불러오기
      } catch (error) {
        console.error("Failed to fire designer:", error);
        // 에러 처리
      }
    }
  };

  const handleRehireButtonClick = async (designer, event) => {
    if (window.confirm("복직 처리하시겠습니까?")) {
      event.preventDefault();
      try {
        console.log(designer.d_num);
        await updateDesignerState(designer.d_num, false);
        console.log("Designer has been rehired successfully.");
        // 복직 처리 후 필요한 작업 수행
        // 새로고침 실행
        fetchData(); // 데이터 다시 불러오기
      } catch (error) {
        console.error("Failed to rehire designer:", error);
        // 에러 처리
      }
    }
  };

  return (
    <div className="mt-1 mr-2 ml-2 space-y-5">
      {/* 성별 선택 셀렉트 박스 */}
      <select
        className="border p-2 mr-3"
        value={gender}
        onChange={handleGenderChange}
      >
        <option value="">성별</option>
        <option value={0}>남자</option>
        <option value={1}>여자</option>
      </select>
      <select
        className="border p-2 mr-3"
        value={state}
        onChange={handleStateChange}
      >
        {/* 근무 선택 셀렉트 박스 */}
        <option value="">근무상태</option>
        <option value={0}>근무</option>
        <option value={1}>퇴사</option>
      </select>

      {/* 검색어 입력창 */}
      <input
        type="text"
        value={keyword}
        onChange={handleChange} // 검색어 변경 처리
        placeholder="검색어를 입력하세요"
        className="px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-xs mr-2"
      />
      <button
        className="ml-2 p-2 bg-blue-500 text-white rounded-md"
        onClick={handleSearchClick}
      >
        검색
      </button>

      {/* 디자이너 목록 */}
      <div className="overflow-x-auto">
        <table className="table text-center">
          <thead>
            <tr className="bg-gradient-to-r from-green-200 via-green-100 to-yellow-200 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
              <th>번호</th>
              <th>이름</th>
              <th>생년월일</th>
              <th>성별</th>
              <th>전화번호</th>
              <th>이메일</th>
              <th>입사일</th>
              <th>퇴사상태</th>
              <th>복직/퇴사</th>
            </tr>
          </thead>
          <tbody>
            {serverData.dtoList && serverData.dtoList.length > 0 ? (
              serverData.dtoList.map((designer) => (
                <tr key={designer.d_num} className="cursor-pointer">
                  <td onClick={() => moveToRead(designer.d_num)}>
                    {designer.d_num}
                  </td>
                  <td onClick={() => moveToRead(designer.d_num)}>
                    {designer.d_name}
                  </td>
                  <td onClick={() => moveToRead(designer.d_num)}>
                    {designer.d_birth}
                  </td>
                  <td onClick={() => moveToRead(designer.d_num)}>
                    {designer.d_gender ? "여자" : "남자"}
                  </td>
                  <td onClick={() => moveToRead(designer.d_num)}>
                    {designer.d_phone}
                  </td>
                  <td onClick={() => moveToRead(designer.d_num)}>
                    {designer.d_email}
                  </td>
                  <td onClick={() => moveToRead(designer.d_num)}>
                    {designer.d_h_date}
                  </td>
                  <td onClick={() => moveToRead(designer.d_num)}>
                    {designer.d_state ? "퇴사" : "근무"}
                  </td>
                  <td className="px-2 py-1 font-medium text-center">
                    {!designer.d_state ? (
                      <input
                        type="button"
                        className="p-1 rounded border border-solid border-neutral-300 bg-blue-500 text-white cursor-pointer"
                        onClick={(event) =>
                          handleResignButtonClick(designer, event)
                        }
                        disabled={false}
                        value="퇴사"
                      />
                    ) : (
                      <input
                        type="button"
                        className="p-1 rounded border border-solid border-neutral-300 bg-green-500 text-white cursor-pointer"
                        onClick={(event) =>
                          handleRehireButtonClick(designer, event)
                        }
                        value="복직"
                      />
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center">
                  검색 결과가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 페이지 네비게이션 */}
      <PageComponent
        serverData={serverData}
        movePage={moveToList}
        currentPage={page}
        pageSize={size}
      />
    </div>
  );
};
export default ListComponent;
