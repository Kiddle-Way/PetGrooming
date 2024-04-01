// PastListComponent.js

import React, { useEffect, useState } from "react";
import { getPastReserveList } from "../../../common/api/reserveApi";
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

const PastListComponent = () => {
  const { page, size, moveToList, refresh} = useCustomMove();
  const [serverData, setServerData] = useState(initState);

  useEffect(() => {
    getPastReserveList({ page, size }).then((data) => {
      console.log(data);
      setServerData(data);
    });
  }, [page, size, refresh]);

  return (
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
              <td>{reserve.a_t_num.time}</td>
              <td>{reserve.d_num.dname}</td>
              <td>{reserve.allProduct}</td>
              <td>{reserve.r_total_price.toLocaleString()}원</td>
              <td>{reserve.r_dog_notice}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <PageComponent serverData={serverData} movePage={moveToList} />
    </div>
  );
};

export default PastListComponent;
