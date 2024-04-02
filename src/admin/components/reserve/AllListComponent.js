import { useEffect, useState } from "react";
import {
  getAllReserveList,
  changeDflag,
  changeMakeAvailable,
} from "../../../common/api/reserveApi";
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
  const { page, size, moveToList, refresh } = useCustomMove();
  const [serverData, setServerData] = useState(initState);

  useEffect(() => {
    getAllReserveList({ page, size }).then((data) => {
      console.log(data);
      setServerData(data);
    });
  }, [page, size, refresh]);

  // 함수를 사용하여 시간 열거형 값을 형식화하는 함수
  const formatTimeEnum = (timeEnum) => {
    switch (timeEnum) {
      case "TIME_1":
        return "09:00~11:00";
      case "TIME_2":
        return "12:00~14:00";
      case "TIME_3":
        return "14:00~16:00";
      case "TIME_4":
        return "16:00~18:00";
      default:
        return "";
    }
  };

  // 취소승인 함수 호출
  const handleCancelApproval = (reserve) => {
    console.log(reserve);
    changeDflag(reserve.r_num).then(() => {
      // 변경된 데이터 다시 불러오기
      getAllReserveList({ page, size }).then((data) => {
        setServerData(data);
      });
    });

    // changeMakeAvailable 함수 실행
    changeMakeAvailable(reserve.r_num).then(() => {
      // 변경된 데이터 다시 불러오기
      getAllReserveList({ page, size }).then((data) => {
        setServerData(data);
      });
    });
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table text-center">
          <thead>
            <tr className="bg-green-100">
              <th>번호</th>
              <th>이메일</th>
              <th>이름</th>
              <th>전화번호</th>
              <th>견종</th>
              <th>예약날짜</th>
              <th>예약시간</th>
              <th>디자이너</th>
              <th>상품명</th>
              <th>총금액</th>
              <th>특이사항</th>
              <th>취소신청</th>
              <th>취소승인</th>
            </tr>
          </thead>
          <tbody>
            {serverData.dtoList.map((reserve, index) => (
              <tr key={reserve.r_num}>
                <td>{index + 1}</td>
                <td>{reserve.m_num.m_email}</td>
                <td>{reserve.m_num.m_name}</td>
                <td>{reserve.m_num.m_phone}</td>
                <td>{reserve.r_breed}</td>
                <td>{reserve.r_date}</td>
                <td>{formatTimeEnum(reserve.a_t_num.time)}</td>
                <td>{reserve.d_num.dname}</td>
                <td>{reserve.allProduct}</td>
                <td>{reserve.r_total_price.toLocaleString()}원</td>
                <td>{reserve.r_dog_notice}</td>
                <td>
                  {reserve.r_delete_request ? (
                    <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                      취소 요청
                    </button>
                  ) : (
                    <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                      예약 중
                    </button>
                  )}
                </td>
                <td>
                  {reserve.r_delete_request ? (
                    <>
                      {!reserve.r_delFlag ? (
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleCancelApproval(reserve)}
                        >
                          취소 승인
                        </button>
                      ) : (
                        <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded">
                          취소 완료
                        </button>
                      )}
                    </>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PageComponent serverData={serverData} movePage={moveToList} />
    </>
  );
};

export default ListComponent;
