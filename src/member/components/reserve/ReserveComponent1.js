import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getList } from "../../../common/api/designerApi";
import useCustomMove from "../../../common/hooks/useCustomMove";
import FetchingModal from "../../../common/components/FetchingModal";

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

const host = "http://localhost:8080";

const ReserveComponent1 = () => {
  const { page, size, refresh } = useCustomMove();
  const [serverData, setServerData] = useState(initState);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true); // 데이터 가져오는 중임을 표시
    getList({ page, size })
      .then((data) => {
        const filteredData = data.dtoList.filter(designer => designer.d_state === false);
        setServerData({ ...data, dtoList: filteredData });
        setFetching(false); // 데이터 가져오기 완료되면 표시 해제
      })
      .catch((error) => {
        console.error("데이터를 불러오는 중에 오류가 발생했습니다:", error);
        setFetching(false); // 데이터 가져오는 도중 오류 발생 시 표시 해제
      });
  }, [page, size, refresh]);

  return (
    <>
      {/* 로딩 중일 때 모달 표시 */}
      {fetching && <FetchingModal />}

      {/* 서버에서 받아온 designer 정보 출력 */}
      <div className="flex flex-wrap justify-center items-center">
        {serverData.dtoList.map((designer) => (
          <Link
            key={designer.d_num}
            to={`/reserve/page/more?info=${designer.d_num}`}
            className="block cursor-pointer m-2"
            style={{ width: "100%", display: "flex" }} // 각 디자이너 요소의 너비를 설정하고, 행으로 배치되도록 설정
          >
            <div style={{ width: "30%" , marginLeft: "200px"}}> {/* 이미지를 왼쪽에 배치하기 위해 50% 너비 설정 */}
              <div className="w-full overflow-hidden">
                <img
                  alt="designer"
                  className="m-auto rounded-md w-100 h-auto object-cover" // 이미지 크기를 반으로 줄임
                  src={`${host}/api/designer/view/${designer.d_uploadFileNames[0]}`}
                />
              </div>
            </div>
            <div style={{ width: "50%", padding: "100px"}}> {/* 텍스트를 오른쪽에 배치하고 왼쪽 여백 추가 */}
              <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{designer.d_name}</div>
              <div style={{ fontSize: "1.25rem" }}>{designer.d_intro}</div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ReserveComponent1;
