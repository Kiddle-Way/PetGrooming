import { useEffect, useState } from "react";
import {
  //search,
  searchGender,
  searchState,
  getList,
  updateDesignerState,
  searchWithKeyword,
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

const SearchTestComponen = () => {
  const { page, size, moveToList, refresh, moveToRead } = useCustomMove();
  const [keyword, setKeyword] = useState(""); // 검색어 상태
  const [serverData, setServerData] = useState(initState); // 서버에서 받아온 데이터 상태
  const [gender, setGender] = useState(""); // 성별 선택 상태
  const [state, setState] = useState(""); // 근무 상태 선택 상태

  // // 데이터 불러오는 함수
  // const fetchData = async () => {
  //   try {
  //     let data;
  //     if (keyword || gender || state) {
  //       // 검색어, 성별, 근무 상태 중 하나라도 값이 존재할 때
  //       // 각 상태값에 따라 검색 함수를 호출하여 데이터를 가져옴
  //       if (gender !== "" && state !== "") {
  //         // 성별과 근무 상태를 모두 고려한 검색
  //         data = await searchGenderAndState(gender, state, { page, size });
  //        } else if (gender !== "") {
  //          // 성별만 선택된 경우
  //          if (keyword !== "") {
  //            // 검색어가 입력된 경우 성별에도 적용
  //           data = await searchGender(gender, { page, size });
  //            data.dtoList = data.dtoList.filter((designer) =>
  //             designer.dname.includes(keyword)
  //            );
  //          } else {
  //            data = await searchGender(gender, { page, size });
  //          }
  //        } else if (state !== "") {
  //          // 근무 상태만 선택된 경우
  //          if (keyword !== "") {
  //            // 검색어가 입력된 경우 근무 상태에도 적용
  //            data = await searchState(state, { page, size });
  //            data.dtoList = data.dtoList.filter((designer) =>
  //              designer.dname.includes(keyword)
  //            );
  //          } else {
  //            data = await searchState(state, { page, size });
  //          }
  //       } else if (keyword !== "") {
  //          // 검색어만 입력된 경우
  //          data = await search(keyword, { page, size });
  //        }
  //      } else {
  //        // 검색어, 성별, 근무 상태가 모두 선택되지 않은 경우
  //        data = await getList({ page, size });
  //      }
  //     setServerData(data);
  //    } catch (error) {
  //      console.error("데이터를 불러오는 데 실패했습니다:", error);
  //    }
  // };
  // 페이지, 사이즈, 새로고침, 검색어, 성별, 근무 상태 변경 시 데이터 다시 불러오기

  // // 데이터 불러오는 함수 수정
  // const fetchData = async () => {
  //   try {
  //     let data;
  //     if (keyword || gender || state) {
  //       // 검색어, 성별, 근무 상태 중 하나라도 값이 존재할 때
  //       // 각 상태값에 따라 검색 함수를 호출하여 데이터를 가져옴
  //       if (gender !== "" && state !== "") {
  //         // 성별과 근무 상태를 모두 고려한 검색
  //         data = await searchGenderAndState(gender, state, { page, size });
  //       } else if (gender !== "") {
  //         // 성별만 선택된 경우
  //         data = await searchGender(gender, { page, size });
  //       } else if (state !== "") {
  //         // 근무 상태만 선택된 경우
  //         data = await searchState(state, { page, size });
  //       } else {
  //         // 검색어만 입력된 경우
  //         data = await search(keyword, { page, size });
  //       }
  //     } else {
  //       // 검색어, 성별, 근무 상태가 모두 선택되지 않은 경우
  //       data = await getList({ page, size });
  //     }
  //     setServerData(data);
  //   } catch (error) {
  //     console.error("데이터를 불러오는 데 실패했습니다:", error);
  //   }
  // };

  // 데이터 불러오는 함수 수정
  const fetchData = async () => {
    try {
      let data;
      if (keyword || gender || state) {
        // 검색어, 성별, 근무 상태 중 하나라도 값이 존재할 때
        // 각 상태값에 따라 검색 함수를 호출하여 데이터를 가져옴
        if (gender !== "" && state !== "") {
          // 성별과 근무 상태를 모두 고려한 검색
          data = await searchGenderAndState(gender, state, { page, size });
        } else if (gender !== "") {
          // 성별만 선택된 경우
          data = await searchGender(gender, { page, size });
        } else if (state !== "") {
          // 근무 상태만 선택된 경우
          data = await searchState(state, { page, size });
        } else {
          // 검색어만 입력된 경우
          data = await searchWithKeyword(keyword, { page, size });
        }
      } else {
        // 검색어, 성별, 근무 상태가 모두 선택되지 않은 경우
        data = await getList({ page, size });
      }
      setServerData(data);
    } catch (error) {
      console.error("데이터를 불러오는 데 실패했습니다:", error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, size, refresh, keyword, gender, state]);

  // 검색 버튼 클릭 시 실행되는 함수
  const handleSearchClick = async () => {
    try {
      await fetchData("", "", "");
    } catch (error) {
      console.error("검색 중 오류 발생:", error);
    }
  };

  // 성별과 근무 상태에 따른 검색 함수
  const searchGenderAndState = async (gender, state, { page, size }) => {
    let data;
    if (gender !== "" && state !== "") {
      data = await searchGenderAndState(gender, state, { page, size });
    } else if (gender !== "") {
      data = await searchGender(gender, "", { page, size });
    } else if (state !== "") {
      data = await searchState(state, "", { page, size });
    }
    return data;
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
    if (window.confirm("처리하시겠습니까?")) {
      event.preventDefault();
      try {
        await updateDesignerState(designer.dno, 1);
        console.log("Designer has been fired successfully.");
        // 퇴직 처리 후 필요한 작업 수행
        // 새로고침 실행
      } catch (error) {
        console.error("Failed to fire designer:", error);
        // 에러 처리
      }
      moveToList({ page: 1 });
    }
  };

  //퇴직,복직버튼
  const handleRehireButtonClick = async (designer, event) => {
    if (window.confirm("처리하시겠습니까?")) {
      event.preventDefault();
      try {
        await updateDesignerState(designer.dno, 0);
        console.log("Designer has been rehired successfully.");
        // 복직 처리 후 필요한 작업 수행
        // 새로고침 실행
      } catch (error) {
        console.error("Failed to rehire designer:", error);
        // 에러 처리
      }
      moveToList({ page: 1 });
    }
  };

  return (
    <div className="border-2 border-blue-100 mt-1 mr-2 ml-2">
      {/* 성별 선택 셀렉트 박스 */}
      <select value={gender} onChange={handleGenderChange}>
        <option value="">성별</option>
        <option value={0}>남자</option>
        <option value={1}>여자</option>
      </select>
      <select value={state} onChange={handleStateChange}>
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
              전화번호
            </div>
            <div className="text-1xl m-1 p-2 w-4/12 font-extrabold text-center">
              이메일
            </div>
            <div className="text-1xl m-1 p-2 w-4/12 font-extrabold text-center">
              입사일
            </div>
            <div className="text-1xl m-1 p-2 w-4/12 font-extrabold text-center">
              퇴사상태
            </div>
            <div className="text-1xl m-1 p-2 w-4/12 font-extrabold text-center">
              복직/퇴사
            </div>
          </div>
        </div>
        {serverData.dtoList && serverData.dtoList.length > 0 ? (
          serverData.dtoList.map((designer) => (
            <div
              key={designer.dno}
              className="w-full p-2 rounded shadow-md cursor-pointer"
            >
              <div className="flex">
                <div
                  className="text-sm w-2/12 p-2 m-1 font-medium text-center"
                  onClick={() => moveToRead(designer.dno)}
                >
                  {designer.dno}
                </div>
                <div
                  className="text-sm w-4/12 p-2 m-1 font-medium text-center"
                  onClick={() => moveToRead(designer.dno)}
                >
                  {designer.dname}
                </div>
                <div
                  className="text-sm w-4/12 p-2 m-1 font-medium text-center"
                  onClick={() => moveToRead(designer.dno)}
                >
                  {designer.dbirth}
                </div>
                <div
                  className="text-sm w-4/12 p-2 m-1 font-medium text-center"
                  onClick={() => moveToRead(designer.dno)}
                >
                  {designer.dgender === 1 ? "여자" : "남자"}
                </div>
                <div
                  className="text-sm w-4/12 p-2 m-1 font-medium text-center"
                  onClick={() => moveToRead(designer.dno)}
                >
                  {designer.dphone}
                </div>
                <div
                  className="text-sm w-4/12 p-2 m-1 font-medium text-center"
                  onClick={() => moveToRead(designer.dno)}
                >
                  {designer.demail}
                </div>
                <div
                  className="text-sm w-4/12 p-2 m-1 font-medium text-center"
                  onClick={() => moveToRead(designer.dno)}
                >
                  {designer.dh_date}
                </div>
                <div
                  className="text-sm w-4/12 p-2 m-1 font-medium text-center"
                  onClick={() => moveToRead(designer.dno)}
                >
                  {designer.dstate === 0 ? "근무" : "퇴사"}
                </div>

                <div className="text-sm w-4/12 p-2 m-1 font-medium text-center">
                  {designer.dstate === 0 ? (
                    <input
                      type="button"
                      className="p-1 rounded border border-solid border-neutral-300 bg-blue-500 text-white"
                      onClick={(event) =>
                        handleResignButtonClick(designer, event)
                      }
                      disabled={false}
                      value="퇴사"
                    />
                  ) : (
                    //   근무중일땐 퇴사버튼 활성화

                    //   퇴사일땐 복직버튼 활성화
                    <input
                      type="button"
                      className="p-1 rounded border border-solid border-neutral-300 bg-green-500 text-white"
                      onClick={(event) =>
                        handleRehireButtonClick(designer, event)
                      }
                      value="복직"
                    />
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center mt-4">검색 결과가 없습니다.</div>
        )}
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
export default SearchTestComponen;
