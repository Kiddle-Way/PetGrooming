import { useState } from "react";
import { postAdd } from "../../../common/api/memberApi";
import { useNavigate } from "react-router-dom";

const initState = {
  m_name: "",
  m_birth: "",
  m_gender: "",
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

const JoinComponent = () => {
  const [member, setMember] = useState({ ...initState });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChangeMember = (e) => {
    setMember({
      ...member,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickAdd = () => {
    if (!validateForm()) {
      setError("모든 필수 입력란을 작성해주세요.");
      return;
    }
    postAdd(member)
      .then((result) => {
        console.log(result);
        // 초기화
        setMember({ ...initState });
        setError("");
        // 내 정보 보기 페이지로 이동
        navigate("/member/login");
      })
      .catch((e) => {
        console.error(e);
        setError("회원 등록 중 오류가 발생했습니다.");
      });
  };

  const validateForm = () => {
    // 필수 입력 필드가 모두 작성되었는지 확인
    return (
      member.m_name.trim() !== "" &&
      member.m_birth.trim() !== "" &&
      member.m_gender.trim() !== "" &&
      member.m_email.trim() !== "" &&
      member.m_pw.trim() !== "" &&
      member.m_phone.trim() !== "" &&
      member.m_addr.trim() !== ""
    );
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">회원 정보 입력</h2>
      <div>
        <label className="block mb-1">이름:</label>
        <input
          type="text"
          name="m_name"
          value={member.m_name}
          onChange={handleChangeMember}
          className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block mb-1">생년월일:</label>
        <input
          type="date"
          name="m_birth"
          value={member.m_birth}
          onChange={handleChangeMember}
          className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block mb-1">성별:</label>
        <select
          name="m_gender"
          value={member.m_state ? "1" : "0"}
          onChange={handleChangeMember}
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
          className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block mb-1">애견 생년월일:</label>
        <input
          type="date"
          name="dog_birth"
          value={member.dog_birth}
          onChange={handleChangeMember}
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
          className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block mb-1">탈퇴 요청 여부:</label>
        <select
          name="m_state"
          value={member.m_state ? "false" : "true"}
          onChange={handleChangeMember}
          className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
        >
          <option value="">선택하세요</option>
          <option value="false">탈퇴 요청 안 함</option>
          <option value="true">탈퇴 요청 함</option>
        </select>
      </div>
      <div>
        <label className="block mb-1">개인정보 동의 여부:</label>
        <select
          name="m_agree"
          value={member.m_agree ? "false" : "true"}
          onChange={handleChangeMember}
          className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
        >
          <option value="">선택하세요</option>
          <option value="false">동의함</option>
          <option value="true">동의하지 않음</option>
        </select>
      </div>
      <div className="text-red-500 mb-2">{error}</div>
      <button
        type="button"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        onClick={handleClickAdd}
      >
        등록
      </button>
    </div>
  );
};

export default JoinComponent;
