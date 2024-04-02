import { getList } from "../../../common/api/designerApi";
import { useEffect, useState } from "react";
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

const DesignerComponents = ({ children }) => {
  const { page, size, refresh } = useCustomMove();
  const [serverData, setServerData] = useState(initState);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true); // 데이터 가져오는 중임을 표시
    getList({ page, size })
      .then((data) => {
        const filteredData = data.dtoList.filter(
          (designer) => designer.d_state === false
        );
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
      {fetching && <FetchingModal />}
      <div className="w-auto">
        <div className="flex justify-end my-9 mr-5">
          홈 ＞ 회사소개 ＞<b>디자이너 소개</b>
        </div>

        <div className="flex flex-col gap-4">
          {/* 이미지와 텍스트 그룹 반복 */}
          {serverData.dtoList.map((designer, item) => (
            <div key={item} className="flex flex-col items-center">
              <div className="w-1/3 overflow-hidden">
                <img
                  alt="designer"
                  className="m-auto rounded-md w-100 h-100 object-cover" // 이미지 크기를 반으로 줄임
                  src={`${host}/api/designer/view/${designer.d_uploadFileNames[0]}`}
                />
              </div>
              <div style={{ fontSize: "1.75rem", fontWeight: "bold" }}>{designer.d_name}</div>
              <div style={{ fontSize: "1.5rem" }}>{designer.d_intro}</div>
              <p className="text-gray-600 text-center"  style={{ fontSize: "1.25rem" }}>
                {item === 0 &&
                  "견주와 강아지가 마음에 들어할 수 있는 펫미용 디자인을 제공하겠습니다"}
                {item === 1 &&
                  "견주와 펫의 특징과 스타일을 고려하여 맞춤형 디자인을 제공하겠습니다"}
                {item === 2 &&
                  "매 시간마다 최신 펫미용 트렌드를 연구하고 적용하여 고객에게 최고의 서비스를 제공하도록 하겠습니다"}
                {item === 3 &&
                  "견주와 펫의 안전을 최우선으로 생각하여 일을 하겠습니다"}
                {item === 4 &&
                  "손님들의 피드백을 받아들이고 계속해서 성장하는 펫미용 디자이너가 되기 위해 노력하겠습니다"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DesignerComponents;
