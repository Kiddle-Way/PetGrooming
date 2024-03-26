import { useState, useEffect } from "react";
import { getOne, putOne } from "../../../common/api/memberApi";
import FetchingModal from "../../../common/components/FetchingModal";
import { getCookie, removeCookie } from "../../../common/util/cookieUtil";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../common/slice/loginSlice"; // loginSlice에서 logout 액션 import

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

const MyPageComponent = () => {
  const [member, setMember] = useState({ ...initState });
  const [fetching, setFetching] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [withdrawalCompleted, setWithdrawalCompleted] = useState(false); // withdrawalCompleted 상태 추가
  const dispatch = useDispatch(); // useDispatch 훅을 사용하여 dispatch 함수를 가져옴
  const [showDetails, setShowDetails] = useState(false); // 개인정보 상세 내용 표시 여부 상태 추가

  useEffect(() => {
    setFetching(true);

    // 쿠키에서 사용자 정보 가져오기
    const memberCookieValue = getCookie("member");

    // 쿠키에서 m_num 가져오기
    const m_num = memberCookieValue ? memberCookieValue.m_num : null;

    if (m_num) {
      getOne(m_num)
        .then((data) => {
          // Date 객체로 변환
          data.m_birth = new Date(data.m_birth).toISOString().split("T")[0];
          data.dog_birth = new Date(data.dog_birth).toISOString().split("T")[0];
          setMember(data);
          setFetching(false);
        })
        .catch((error) => {
          console.error("Error fetching member data:", error);
          setFetching(false);
        });
    } else {
      setFetching(false);
    }
  }, []);

  const handleChangeMember = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // 전화번호 입력 시 자동으로 하이픈(-) 추가
    if (name === "m_phone") {
      formattedValue = formattedValue.replace(/[^0-9]/g, ""); // 숫자 이외의 문자 제거
      if (formattedValue.length > 3 && formattedValue.length <= 7) {
        formattedValue = `${formattedValue.slice(0, 3)}-${formattedValue.slice(
          3
        )}`;
      } else if (formattedValue.length > 7) {
        formattedValue = `${formattedValue.slice(0, 3)}-${formattedValue.slice(
          3,
          7
        )}-${formattedValue.slice(7)}`;
      }
    } else if (name === "m_birth" || name === "dog_birth") {
      // 생년월일 입력 시 '-' 추가
      const selectedDate = new Date(value);
      formattedValue = selectedDate.toISOString().split("T")[0];
    }

    setMember({
      ...member,
      [name]: formattedValue,
    });
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
    setMember({ ...initState });
    navigate("/");
  };

  const handleSubmit = () => {
    // 이메일, 비밀번호, 전화번호 유효성 검사
    if (!validateEmail(member.m_email)) {
      setError("유효하지 않은 이메일 형식입니다.");
      return;
    }

    if (!validatePassword(member.m_pw)) {
      setError("비밀번호는 숫자와 영문자를 포함한 8~20자여야 합니다.");
      return;
    }

    if (!validatePhone(member.m_phone)) {
      setError("유효하지 않은 전화번호 형식입니다.");
      return;
    }

    // 서버로 업데이트 요청
    putOne(member)
      .then(() => {
        setEditMode(false);
        setError("");
      })
      .catch((error) => {
        console.error("Error updating member data:", error);
        setError("회원 정보 수정 중 오류가 발생했습니다.");
      });
  };

  const handleWithdrawal = () => {
    const confirmed = window.confirm("정말로 탈퇴하시겠습니까?");
    if (confirmed) {
      const updatedMember = { ...member, m_state: true };
      putOne(updatedMember)
        .then(() => {
          removeCookie("member");
          setWithdrawalCompleted(true);
          dispatch(logout());
          alert("회원 탈퇴가 완료되었습니다.");
        })
        .catch((error) => {
          console.error("Error updating member data:", error);
          setError("회원 탈퇴 중 오류가 발생했습니다.");
        });
    }
  };

  useEffect(() => {
    if (withdrawalCompleted) {
      // withdrawalCompleted 상태가 변경되면 네비게이션 업데이트
      navigate("/member/login");
    }
  }, [withdrawalCompleted, navigate]);

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

  const toggleDetails = () => {
    setShowDetails(!showDetails); // 상세 내용 표시 여부를 토글
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-md rounded-md">
      {fetching ? (
        <FetchingModal />
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">회원 정보</h2>
          {editMode ? (
            <div>
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
                    생년월일:
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
                  disabled
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  name="m_pw"
                  value={member.m_pw}
                  onChange={handleChangeMember}
                  placeholder="*비밀번호"
                  className="input-field"
                />
              </div>
              <div className="mb-4">
                <input
                  type="tel"
                  name="m_phone"
                  value={member.m_phone}
                  onChange={handleChangeMember}
                  placeholder="*전화번호(11자리 숫자만)"
                  className="input-field"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="m_addr"
                  value={member.m_addr}
                  onChange={handleChangeMember}
                  placeholder="*주소(시군구까지만)"
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
                  <label
                    htmlFor="dog_birth"
                    className="text-sm font-medium mr-2"
                  >
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
                    이 웹사이트는 회원 가입 및 로그인 시 개인정보를 수집합니다.
                    수집된 개인정보는 회원 관리, 서비스 제공, 고객 의견 조사
                    등을 위해 사용됩니다.
                  </p>
                  {/* 추가적인 정보 */}
                </div>
              )}
              {error && <div className="text-red-500 mb-4">{error}</div>}
              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                  onClick={handleSubmit}
                >
                  수정 완료
                </button>
                <button
                  type="button"
                  className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
                  onClick={handleWithdrawal}
                >
                  탈퇴하기
                </button>
                <button
                  type="button"
                  className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
                  onClick={handleCancel}
                >
                  취소
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  이름:
                </label>
                <div className="mt-1">{member.m_name}</div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  생년월일:
                </label>
                <div className="mt-1">{member.m_birth}</div>
                {/* 숫자로 변환된 날짜 */}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  성별:
                </label>
                <div className="mt-1">
                  {member.m_gender === 1 ? "남자" : "여자"}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  이메일:
                </label>
                <div className="mt-1">{member.m_email}</div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  전화번호:
                </label>
                <div className="mt-1">{member.m_phone}</div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  주소:
                </label>
                <div className="mt-1">{member.m_addr}</div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  애견 종:
                </label>
                <div className="mt-1">{member.dog_breed}</div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  애견 이름:
                </label>
                <div className="mt-1">{member.dog_name}</div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  애견 생년월일:
                </label>
                <div className="mt-1">{member.dog_birth}</div>
                {/* 숫자로 변환된 날짜 */}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  애견 특이사항:
                </label>
                <div className="mt-1">{member.dog_notice}</div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  개인정보 동의 여부:
                </label>
                <div className="mt-1">
                  {member.m_agree ? "동의하지 않음" : "동의함"}
                </div>
              </div>
              <button
                type="button"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                onClick={handleEdit}
              >
                수정하기
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyPageComponent;
