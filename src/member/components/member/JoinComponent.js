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
  const [member, setMember] = useState({ ...initState, m_state: false });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false); // 개인정보 상세 내용 표시 여부 상태 추가

  const handleChangeMember = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // 이름의 길이가 30자를 초과하는지 확인
    if (name === "m_name" && value.length > 15) {
      // 이름의 길이가 30자를 초과하면 앞에서부터 30자까지만 저장
      formattedValue = value.slice(0, 15);
    }

    // 이메일의 길이가 50자를 초과하는지 확인
    if (name === "m_email" && value.length > 50) {
      // 이메일의 길이가 50자를 초과하면 앞에서부터 50자까지만 저장
      formattedValue = value.slice(0, 50);
    }

    // 전화번호 입력 시 자동으로 하이픈(-) 추가
    if (name === "m_phone") {
      // 숫자 이외의 문자 제거
      formattedValue = formattedValue.replace(/[^0-9]/g, "");
      if (formattedValue.length > 3 && formattedValue.length <= 7) {
        formattedValue = `${formattedValue.slice(0, 3)}-${formattedValue.slice(
          3
        )}`;
      } else if (formattedValue.length > 7) {
        formattedValue = `${formattedValue.slice(0, 3)}-${formattedValue.slice(
          3,
          7
        )}-${formattedValue.slice(7, 11)}`;
      }
    }

    // 주소의 길이가 30자를 초과하는지 확인
    if (name === "m_addr" && value.length > 30) {
      // 주소의 길이가 30자를 초과하면 앞에서부터 30자까지만 저장
      formattedValue = value.slice(0, 30);
    }

    // 애견종 길이가 30자를 초과하는지 확인
    if (name === "dog_breed" && value.length > 30) {
      // 애견종의 길이가 30자를 초과하면 앞에서부터 30자까지만 저장
      formattedValue = value.slice(0, 30);
    }

    // 애견이름 길이가 30자를 초과하는지 확인
    if (name === "dog_name" && value.length > 30) {
      // 애견이름의 길이가 30자를 초과하면 앞에서부터 30자까지만 저장
      formattedValue = value.slice(0, 30);
    }

    // 애견특이사항 길이가 300자를 초과하는지 확인
    if (name === "dog_breed" && value.length > 300) {
      // 애견특이사항의 길이가 300자를 초과하면 앞에서부터 300자까지만 저장
      formattedValue = value.slice(0, 300);
    }

    // 개인정보 동의 콤보박스의 경우 현재 선택된 값과 새로운 값이 다를 때만 업데이트
    if (name === "m_agree" && member.m_agree.toString() !== value) {
      setMember({
        ...member,
        [name]: value === "true", // "true"를 boolean 값으로 변환하여 저장
      });
    } else {
      setMember({
        ...member,
        [name]: formattedValue,
      });
    }
  };

  const handleClickAdd = () => {
    // 개인정보 동의 여부 확인
    if (!validateAgree(!member.m_agree)) {
      setError("개인정보 수집 및 이용에 동의해야 합니다.");
      return;
    }

    // 데이터 유효성 검사
    if (!validateEmail(member.m_email)) {
      setError("유효한 이메일을 입력해주세요.");
      return;
    }

    if (!validatePassword(member.m_pw)) {
      setError(
        "비밀번호는 최소 8자 이상, 영문 대소문자 및 숫자를 포함해야 합니다."
      );
      return;
    }

    if (!validatePhone(member.m_phone)) {
      setError("유효한 휴대폰 번호를 입력해주세요. (형식: xxx-xxxx-xxxx)");
      return;
    }

    // 서버로 데이터를 전송합니다.
    postAdd(member)
      .then((result) => {
        setMember({ ...initState, m_state: false });
        setError("");
        navigate("/member/login");
        showCongratulationsAlert(member.m_name); // 회원 가입 완료 후 축하 메시지 띄우기
      })
      .catch((e) => {
        console.error(e);
        setError("회원 등록 중 오류가 발생했습니다.");
      });
  };

  // 개인정보동의 유효성 검사 함수
  const validateAgree = (agree) => {
    return agree; // 동의 여부가 true이면 유효성 통과, false이면 유효성 실패
  };

  // 이메일 유효성 검사 함수
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // 비밀번호 유효성 검사 함수
  const validatePassword = (password) => {
    const re = /^(?=.*\d)(?=.*[a-zA-Z]).{8,20}$/;
    return re.test(password);
  };

  // 휴대폰 번호 유효성 검사 함수
  const validatePhone = (phone) => {
    const re = /^\d{3}-\d{3,4}-\d{4}$/;
    return re.test(phone);
  };

  // 현재 날짜를 가져오는 함수
  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };

  const showCongratulationsAlert = (name) => {
    alert(`${name}님, 회원 가입을 축하합니다!`);
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails); // 상세 내용 표시 여부를 토글
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-md rounded-md">
      <div className="mb-4">
        <input
          type="text"
          name="m_name"
          value={member.m_name}
          onChange={handleChangeMember}
          placeholder="*이름"
          className="input-field"
        />
      </div>
      <div className="mb-4">
        <div className="flex items-center">
          <label htmlFor="m_birth" className="text-sm font-medium mr-2">
            *생년월일:
          </label>
          <input
            type="date"
            name="m_birth"
            value={member.m_birth}
            onChange={handleChangeMember}
            max={getCurrentDate()} // 현재 날짜 이전만 선택 가능하도록 설정
            placeholder="생년월일"
            className="input-field"
          />
        </div>
      </div>
      <div className="mb-4">
        <select
          name="m_gender"
          value={member.m_gender}
          onChange={handleChangeMember}
          className="input-field"
        >
          <option value="">*성별 선택</option>
          <option value="1">남자</option>
          <option value="0">여자</option>
        </select>
      </div>
      <div className="mb-4">
        <input
          type="email"
          name="m_email"
          value={member.m_email}
          onChange={handleChangeMember}
          placeholder="*이메일"
          className="input-field"
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          name="m_pw"
          value={member.m_pw}
          onChange={handleChangeMember}
          placeholder="*비밀번호(8자리 이상)"
          className="input-field"
        />
      </div>
      <div className="mb-4">
        <input
          type="tel"
          name="m_phone"
          value={member.m_phone}
          onChange={handleChangeMember}
          placeholder="*휴대폰 번호(-없이 입력)"
          className="input-field"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          name="m_addr"
          value={member.m_addr}
          onChange={handleChangeMember}
          placeholder="*주소(시군구 까지만)"
          className="input-field"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          name="dog_breed"
          value={member.dog_breed}
          onChange={handleChangeMember}
          placeholder="애견 종"
          className="input-field"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          name="dog_name"
          value={member.dog_name}
          onChange={handleChangeMember}
          placeholder="애견 이름"
          className="input-field"
        />
      </div>
      <div className="mb-4">
        <div className="flex items-center">
          <label htmlFor="dog_birth" className="text-sm font-medium mr-2">
            애견 생년월일:
          </label>
          <input
            type="date"
            name="dog_birth"
            value={member.dog_birth}
            onChange={handleChangeMember}
            max={getCurrentDate()} // 현재 날짜 이전만 선택 가능하도록 설정
            placeholder="애견 생년월일"
            className="input-field"
          />
        </div>
      </div>
      <div className="mb-4">
        <input
          type="text"
          name="dog_notice"
          value={member.dog_notice}
          onChange={handleChangeMember}
          placeholder="애견 특이사항"
          className="input-field"
        />
      </div>
      <div className="mb-4">
        <select
          name="m_agree"
          value={member.m_agree ? "true" : "false"}
          onChange={handleChangeMember}
          className="input-field"
        >
          <option value="false">*개인정보 동의함</option>
          <option value="true">개인정보 동의하지 않음</option>
        </select>
        {/* 개인정보 동의 콤보박스 */}
        <button
          type="button"
          className="text-blue-500 hover:underline ml-2 focus:outline-none"
          onClick={toggleDetails}
        >
          {showDetails ? "접기" : "자세히 보기"}
        </button>
      </div>
      {/* 개인정보 상세 내용 */}
      {showDetails && (
        <div className="bg-gray-100 p-4 rounded-md">
          {/* 개인정보 동의에 대한 상세 내용 */}
          <p>
            이 웹사이트는 회원 가입 및 로그인 시 개인정보를 수집합니다. 수집된
            개인정보는 회원 관리, 서비스 제공, 고객 의견 조사 등을 위해
            사용됩니다.
          </p>
          {/* 추가적인 정보 */}
        </div>
      )}

      {error && <div className="text-red-500 mb-4">{error}</div>}
      <button
        type="button"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        onClick={() => {
          handleClickAdd();
        }}
      >
        등록
      </button>
    </div>
  );
};

export default JoinComponent;
