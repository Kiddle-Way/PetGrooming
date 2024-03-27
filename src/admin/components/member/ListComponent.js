import { useEffect, useState } from "react";
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

  useEffect(() => {
    getList({ page, size }).then((data) => {
      console.log(data);
      setServerData(data);
    });
  }, [page, size]);

  return (
    <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
      <div className="mx-auto p-6">
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
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {serverData.dtoList.map((member) => (
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    {member.dog_birth.slice(0, 10)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {member.dog_notice}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <PageComponent
          serverData={serverData}
          movePage={moveToList}
        ></PageComponent>
      </div>
    </div>
  );
};

export default ListComponent;
