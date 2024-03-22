import { useState, useEffect } from "react";
import { getOne } from "../../../common/api/memberApi";
import FetchingModal from "../../../common/components/FetchingModal";

const initState = {
  m_name: "",
  m_birth: "",
  m_gender: 0,
  m_email: "",
  m_pw: "",
  m_phone: "",
  m_addr: "",
  dog_breed: "",
  dog_name: "",
  dog_birth: "",
  dog_notice: "",
  m_state: false,
  m_agree: false,
};

const MyPageComponent = ({ m_num }) => {
  const [member, setMember] = useState({ ...initState });
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    setFetching(true);
    const m_num = 1;
    getOne(m_num)
      .then((data) => {
        // Date 형식으로 변환
        data.m_birth = new Date(data.m_birth).toLocaleDateString();
        data.dog_birth = new Date(data.dog_birth).toLocaleDateString();
        // 숫자로 변환
        data.m_birth_numeric = Date.parse(data.m_birth);
        data.dog_birth_numeric = Date.parse(data.dog_birth);
        setMember(data);
        setFetching(false);
      })
      .catch((error) => {
        console.error("Error fetching member data:", error);
        setFetching(false);
      });
  }, [m_num]);

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">회원 정보</h2>
      {fetching ? (
        <FetchingModal />
      ) : (
        <div>
          <div>
            <label className="block mb-1">이름:</label>
            <div>{member.m_name}</div>
          </div>
          <div>
            <label className="block mb-1">생년월일:</label>
            <div>{member.m_birth}</div>
            <div>{member.m_birth_numeric}</div> {/* 숫자로 변환된 날짜 */}
          </div>
          <div>
            <label className="block mb-1">성별:</label>
            <div>{member.m_gender === 1 ? "남자" : "여자"}</div>
          </div>
          <div>
            <label className="block mb-1">이메일:</label>
            <div>{member.m_email}</div>
          </div>
          <div>
            <label className="block mb-1">전화번호:</label>
            <div>{member.m_phone}</div>
          </div>
          <div>
            <label className="block mb-1">주소:</label>
            <div>{member.m_addr}</div>
          </div>
          <div>
            <label className="block mb-1">애견 종:</label>
            <div>{member.dog_breed}</div>
          </div>
          <div>
            <label className="block mb-1">애견 이름:</label>
            <div>{member.dog_name}</div>
          </div>
          <div>
            <label className="block mb-1">애견 생년월일:</label>
            <div>{member.dog_birth}</div>
            <div>{member.dog_birth_numeric}</div> {/* 숫자로 변환된 날짜 */}
          </div>
          <div>
            <label className="block mb-1">애견 특이사항:</label>
            <div>{member.dog_notice}</div>
          </div>
          <div>
            <label className="block mb-1">탈퇴 요청 여부:</label>
            <div>{member.m_state ? "탈퇴 요청 함" : "탈퇴 요청 안 함"}</div>
          </div>
          <div>
            <label className="block mb-1">개인정보 동의 여부:</label>
            <div>{member.m_agree ? "동의하지 않음" : "동의함"}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPageComponent;
