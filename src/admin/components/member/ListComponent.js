import React, { useEffect, useState } from "react";
import { getList } from "../../../common/api/memberApi";
import useCustomMove from "../../../common/hooks/useCustomMove";
import PageComponent from "../../../common/component/PageComponent";

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
  const [filteredData, setFilteredData] = useState([]);
  const [showWithdrawn, setShowWithdrawn] = useState(true); // 회원 탈퇴된 회원만 보이도록 설정
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 추가

  useEffect(() => {
    getList({ page, size }).then((data) => {
      setServerData(data);
      filterData(data.dtoList);
    });
  }, [page, size]);

  useEffect(() => {
    // 검색어가 변경될 때마다 데이터 필터링
    filterData(serverData.dtoList);
  }, [searchTerm, showWithdrawn, serverData.dtoList]);

  const filterData = (dataList) => {
    let filteredList = dataList;

    if (!showWithdrawn) {
      // 탈퇴 회원만 보여줄 때는 탈퇴된 회원만 필터링
      filteredList = filteredList.filter((member) => member.m_state);
    } else {
      // 회원만 보여줄 때는 탈퇴되지 않은 회원만 필터링
      filteredList = filteredList.filter((member) => !member.m_state);
    }

    if (searchTerm) {
      // 검색어가 있을 때 이름 또는 전화번호로 필터링
      filteredList = filteredList.filter(
        (member) =>
          member.m_name.includes(searchTerm) ||
          member.m_phone.includes(searchTerm) ||
          member.m_email.includes(searchTerm)
      );
    }
    setFilteredData(filteredList);
  };

  const toggleWithdrawn = () => {
    setShowWithdrawn(!showWithdrawn);
  };

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
          <button
            onClick={toggleWithdrawn}
            className={`px-4 py-2 rounded-md text-white ${
              showWithdrawn ? "bg-red-500" : "bg-green-500"
            }`}
          >
            {showWithdrawn ? "탈퇴된 회원 보기" : "회원 보기"}
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-orange-50">
              <tr>
                <th
                  scope="col"
                  className="font-extrabold text-1xl px-6 py-3 text-left"
                >
                  회원번호
                </th>
                <th
                  scope="col"
                  className="font-extrabold text-1xl px-6 py-3 text-left"
                >
                  회원이름
                </th>
                <th
                  scope="col"
                  className="font-extrabold text-1xl px-6 py-3 text-left"
                >
                  생년월일
                </th>
                <th
                  scope="col"
                  className="font-extrabold text-1xl px-6 py-3 text-left"
                >
                  성별
                </th>
                <th
                  scope="col"
                  className="font-extrabold text-1xl px-6 py-3 text-left"
                >
                  이메일
                </th>
                <th
                  scope="col"
                  className="font-extrabold text-1xl px-6 py-3 text-left"
                >
                  전화번호
                </th>
                <th
                  scope="col"
                  className="font-extrabold text-1xl px-6 py-3 text-left"
                >
                  주소
                </th>
                <th
                  scope="col"
                  className="font-extrabold text-1xl px-6 py-3 text-left"
                >
                  견종
                </th>
                <th
                  scope="col"
                  className="font-extrabold text-1xl px-6 py-3 text-left"
                >
                  견명
                </th>
                <th
                  scope="col"
                  className="font-extrabold text-1xl px-6 py-3 text-left"
                >
                  견생년월일
                </th>
                <th
                  scope="col"
                  className="font-extrabold text-1xl px-6 py-3 text-left"
                >
                  견특이사항
                </th>
                <th
                  scope="col"
                  className="font-extrabold text-1xl px-6 py-3 text-left"
                >
                  탈퇴여부
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((member) => (
                <tr key={member.m_num}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {member.m_num}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {member.m_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {member.m_birth.slice(0, 10)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {member.m_gender === 1 ? "남자" : "여자"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {member.m_email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {member.m_phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {member.m_addr}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {member.dog_breed}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {member.dog_name}
                  </td>
                  <td
                    className="px-
6 py-4 whitespace-nowrap"
                  >
                    {member.dog_birth.slice(0, 10)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {member.dog_notice}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
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
