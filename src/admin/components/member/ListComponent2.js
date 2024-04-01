import React, { useEffect, useState } from "react";
import { getList2 } from "../../../common/api/memberApi";
import useCustomMove from "../../../common/hooks/useCustomMove";
import PageComponent from "../../../common/component/PageComponent";
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
    getList2({ page, size }).then((data) => {
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
          <button className="ml-4 px-4 py-2 rounded-md bg-blue-500 text-white">
            <Link to={"/member/list"}>회원보기</Link>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-orange-50">
              <tr>
                <th
                  scope="col"
                  className="font-extrabold text-sm px-6 py-3 text-left"
                >
                  회원번호
                </th>
                <th
                  scope="col"
                  className="font-extrabold text-sm px-6 py-3 text-left"
                >
                  회원이름
                </th>
                <th
                  scope="col"
                  className="font-extrabold text-sm px-6 py-3 text-left"
                >
                  생년월일
                </th>
                <th
                  scope="col"
                  className="font-extrabold text-sm px-6 py-3 text-left"
                >
                  성별
                </th>
                <th
                  scope="col"
                  className="font-extrabold text-sm px-6 py-3 text-left"
                >
                  이메일
                </th>
                <th
                  scope="col"
                  className="font-extrabold text-sm px-6 py-3 text-left"
                >
                  전화번호
                </th>
                <th
                  scope="col"
                  className="font-extrabold text-sm px-6 py-3 text-left"
                >
                  주소
                </th>
                <th
                  scope="col"
                  className="font-extrabold text-sm px-6 py-3 text-left"
                >
                  견종
                </th>
                <th
                  scope="col"
                  className="font-extrabold text-sm px-6 py-3 text-left"
                >
                  견명
                </th>
                <th
                  scope="col"
                  className="font-extrabold text-sm px-6 py-3 text-left"
                >
                  견생년월일
                </th>
                <th
                  scope="col"
                  className="font-extrabold text-sm px-6 py-3 text-left"
                >
                  견특이사항
                </th>
                <th
                  scope="col"
                  className="font-extrabold text-sm px-6 py-3 text-left"
                >
                  탈퇴여부
                </th>
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
                    <td className="px-6 py-4 text-sm whitespace-nowrap">
                      {member.m_num}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap">
                      {member.m_name}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap">
                      {member.m_birth.slice(0, 10)}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap">
                      {member.m_gender === 1 ? "남자" : "여자"}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap">
                      {member.m_email}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap">
                      {member.m_phone}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap">
                      {member.m_addr}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap">
                      {member.dog_breed}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap">
                      {member.dog_name}
                    </td>
                    <td
                      className="px-
6 py-4 whitespace-nowrap"
                    >
                      {member.dog_birth.slice(0, 10)}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap">
                      {member.dog_notice}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap">
                      {member.m_state ? "회원탈퇴" : "회원"}
                    </td>
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
