import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOne } from "../../../common/api/memberApi";
import { putOne } from "../../../common/api/memberApi";

const MyPageComponent = () => {
  const [member, setMember] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { m_num } = useParams(); // 이 부분을 추가하여 m_num 값을 가져옴

  useEffect(() => {
    // 사용자 정보 가져오기
    const fetchMember = async () => {
      try {
        const response = await getOne(m_num); // m_num을 useParams로부터 가져옴
        setMember(response);
      } catch (error) {
        console.error("사용자 정보를 가져오는 중 오류 발생:", error);
        // 오류 처리 로직 추가
      }
    };

    fetchMember();
  }, [m_num]); // m_num이 변경될 때마다 다시 호출

  if (!member) {
    // 사용자 정보가 로딩 중일 때 표시할 UI
    return <div>Loading...</div>;
  }


  const handleChangeMember = (e) => {
    const { name, value } = e.target;
    setMember({
      ...member,
      [name]: value,
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // 서버로 수정된 회원 정보 전송
    putOne(member)
      .then((response) => {
        console.log("Member updated successfully:", response.data);
        setIsEditing(false);
        // 메인페이지로 이동
        navigate("/");
      })
      .catch((error) => {
        console.error("Error updating member details:", error);
      });
  };

  const handleWithdrawalRequest = () => {
    // 회원 탈퇴 요청 보내기
    const updatedMember = { ...member, m_state: true }; // 탈퇴 요청으로 상태 변경
    putOne(updatedMember)
      .then((response) => {
        console.log("Withdrawal request sent successfully:", response.data);
        setMember(updatedMember); // 클라이언트 상태 업데이트
      })
      .catch((error) => {
        console.error("Error sending withdrawal request:", error);
      });
  };

  // 서버에서 가져온 데이터가 날짜 형식의 문자열인지 확인
  if (typeof member.m_birth === "string") {
    // 날짜 형식의 문자열을 Date 객체로 변환하여 다시 문자열로 변환
    const formattedBirthDate = new Date(member.m_birth)
      .toISOString()
      .split("T")[0];
    const formattedDogBirthDate = new Date(member.dog_birth)
      .toISOString()
      .split("T")[0];
    return (
      <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4">회원 정보 상세</h2>
        <div>
          <label className="block mb-1">이름:</label>
          <input
            type="text"
            name="m_name"
            value={member.m_name}
            onChange={handleChangeMember}
            disabled={!isEditing}
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block mb-1">생년월일:</label>
          <input
            type="date"
            name="m_birth"
            value={formattedBirthDate}
            onChange={handleChangeMember}
            disabled={!isEditing}
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block mb-1">성별:</label>
          <select
            name="m_gender"
            value={member.m_gender ? "1" : "0"}
            onChange={handleChangeMember}
            disabled={!isEditing}
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
          >
            <option value="">선택하세요</option>
            <option value="1">남자</option>
            <option value="0">여자</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">이메일:</label>
          <input
            type="email"
            name="m_email"
            value={member.m_email}
            onChange={handleChangeMember}
            disabled
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block mb-1">비밀번호:</label>
          <input
            type="password"
            name="m_pw"
            value={member.m_pw}
            onChange={handleChangeMember}
            disabled={!isEditing}
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block mb-1">전화번호:</label>
          <input
            type="tel"
            name="m_phone"
            value={member.m_phone}
            onChange={handleChangeMember}
            placeholder="전호번호를 입력해주세요 (11자리, -제외)"
            disabled={!isEditing}
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block mb-1">주소:</label>
          <input
            type="text"
            name="m_addr"
            value={member.m_addr}
            onChange={handleChangeMember}
            placeholder="주소는 시군구까지만 입력해주세요 (ex 서울특별시 마포구)"
            disabled={!isEditing}
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block mb-1">애견 종:</label>
          <input
            type="text"
            name="dog_breed"
            value={member.dog_breed}
            onChange={handleChangeMember}
            disabled={!isEditing}
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block mb-1">애견 이름:</label>
          <input
            type="text"
            name="dog_name"
            value={member.dog_name}
            onChange={handleChangeMember}
            disabled={!isEditing}
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block mb-1">애견 생년월일:</label>
          <input
            type="date"
            name="dog_birth"
            value={formattedDogBirthDate}
            onChange={handleChangeMember}
            disabled={!isEditing}
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block mb-1">애견 특이사항:</label>
          <input
            type="text"
            name="dog_notice"
            value={member.dog_notice}
            onChange={handleChangeMember}
            disabled={!isEditing}
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block mb-1">탈퇴 요청 여부:</label>
          <select
            name="m_state"
            value={member.m_state ? "true" : "false"}
            onChange={handleChangeMember}
            disabled={!isEditing}
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
          >
            <option value="false">탈퇴 요청 안 함</option>
            <option value="true">탈퇴 요청 함</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">개인정보 동의 여부:</label>
          <select
            name="m_agree"
            value={member.m_agree ? "true" : "false"}
            onChange={handleChangeMember}
            disabled={!isEditing}
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
          >
            <option value="false">동의함</option>
            <option value="true">동의하지 않음</option>
          </select>
        </div>
        {isEditing ? (
          <div className="flex justify-end mt-4">
            <button
              onClick={handleSave}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-2"
            >
              저장하기
            </button>
            <button
              onClick={handleWithdrawalRequest}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            >
              탈퇴하기
            </button>
          </div>
        ) : (
          <div className="flex justify-end mt-4">
            <button
              onClick={handleEdit}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-2"
            >
              수정하기
            </button>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div>Loading...</div> // 또는 에러 처리
    );
  }
};

export default MyPageComponent;
