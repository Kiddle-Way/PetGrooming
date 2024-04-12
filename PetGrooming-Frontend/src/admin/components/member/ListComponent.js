import React, { useEffect, useState } from "react";
import { getList } from "../../../common/api/memberApi";
import useCustomMove from "../../../common/hooks/useCustomMove";
import PageComponent from "../../../common/components/PageComponent";
import { Link } from "react-router-dom";

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
  const { page, size, moveToList } = useCustomMove();

  const [serverData, setServerData] = useState(initState);
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 추가

  useEffect(() => {
    getList({ page, size }).then((data) => {
      setServerData(data);
    });
  }, [page, size]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div
      className="border-2 border-blue-100 mt-10 mr-2 ml-2"
      style={{ whiteSpace: "nowrap" }}
    >
      <div className="mx-auto p-6">
        <div className="flex justify-between mb-4">
          <div className="border border-gray-300 rounded-md">
            <input
              type="text"
              placeholder="검색어 입력"
              value={searchTerm}
              onChange={handleSearch}
              className="px-4 py-2 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>
          <button className="ml-4 px-4 py-2 rounded-md bg-red-500 text-white">
            <Link to={"/member/retire"}>탈퇴회원보기</Link>
          </button>
        </div>
        <div className="my-5 overflow-x-auto">
          <table className="table text-center">
            <thead className="bg-orange-50">
            <tr className="bg-gradient-to-r from-green-200 via-green-100 to-yellow-200 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
                <th>회원번호</th>
                <th>회원이름</th>
                <th>생년월일</th>
                <th>성별</th>
                <th>이메일</th>
                <th>전화번호</th>
                <th>주소</th>
                <th>견종</th>
                <th>견명</th>
                <th>견생년월일</th>
                <th>견특이사항</th>
                <th>탈퇴여부</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {serverData.dtoList
                .filter(
                  (member) =>
                    // 검색어가 존재할 때만 필터링된 데이터 매핑
                    searchTerm
                      ? member.m_name.includes(searchTerm) ||
                        member.m_phone.includes(searchTerm) ||
                        member.m_email.includes(searchTerm)
                      : true // 검색어가 없을 때는 모든 데이터 매핑
                )
                .map((member) => (
                  <tr key={member.m_num}>
                    <td>{member.m_num}</td>
                    <td>{member.m_name}</td>
                    <td>{member.m_birth.slice(0, 10)}</td>
                    <td>{member.m_gender === 1 ? "남자" : "여자"}</td>
                    <td>{member.m_email}</td>
                    <td>{member.m_phone}</td>
                    <td>{member.m_addr}</td>
                    <td>{member.dog_breed}</td>
                    <td>{member.dog_name}</td>
                    <td>{member.dog_birth.slice(0, 10)}</td>
                    <td>{member.dog_notice}</td>
                    <td>{member.m_state ? "회원탈퇴" : "회원"}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <PageComponent serverData={serverData} movePage={moveToList} />
      </div>
    </div>
  );
};

export default ListComponent;
