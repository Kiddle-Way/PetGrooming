import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "../../image/logo12.jpg";
import { useState, useEffect } from "react";

const Navbar = () => {
  const loginState = useSelector((state) => state.loginSlice);
  const [withdrawalCompleted, setWithdrawalCompleted] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (withdrawalCompleted) {
      // 회원 탈퇴가 완료되면 로그인 상태를 false로 설정
      dispatch({ type: "logout" });
      setWithdrawalCompleted(false); // withdrawalCompleted 상태 재설정
    }
  }, [withdrawalCompleted, dispatch]);

  const handleLogout = () => {
    // 로그아웃 버튼 클릭 시 실행되는 함수
    setWithdrawalCompleted(true); // withdrawalCompleted 상태 변경
  };

  const [isOpen, setIsOpen] = useState(false); // 메뉴 상태 관리

  // 햄버거 메뉴 클릭 이벤트 핸들러
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // 드롭다운 메뉴 이벤트 리스너
  window.addEventListener("click", function (e) {
    //모든 .dropdown 요소를 찾아 실행
    document.querySelectorAll(".dropdown").forEach(function (dropdown) {
      if (!dropdown.contains(e.target)) {
        // 클릭된 요소가 드롭다운이 아닌 경우 드롭다운 메뉴를 닫음
        dropdown.open = false;
      }
    });
  });
  return (
    <div className="container mx-auto mt-2 sm:px-2 lg:px-1">
      <nav className="rounded-2xl mx-auto flex flex-wrap justify-center navbar outline outline-4 outline-amber-400 dark:bg-gray-900 dark:border-gray-700">
        <div className="flex flex-wrap items-center justify-between mb-1 mr-5">
          <Link to={"/"}>
            <img src={Logo} className="h-16 md:h-20 lg:h-24 xl:h-28" alt="" />
          </Link>
          <button onClick={toggleMenu} className="lg:hidden px-2 py-1 text-xl">
            {/* 햄버거 메뉴 아이콘 */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
        <div className={`lg:flex lg:flex-none ${isOpen ? "block" : "hidden"}`}>
          <ul className="menu menu-horizontal px-1">
            <details className="dropdown">
              <summary className="m-1 text-xl btn btn-ghost text-black hover:text-blue-600">
                회사소개
              </summary>
              <ul className="p-2 shadow menu dropdown-content z-[1] bg-gray-50 rounded-box w-52">
                <li>
                  <Link to={"/about/"}>인사말</Link>
                </li>
                <li>
                  <Link to={"/about/designer/"}>디자이너소개</Link>
                </li>
                <li>
                  <Link to={"/about/shop/"}>오시는길</Link>
                </li>
              </ul>
            </details>

            <details className="dropdown">
              <summary className="m-1 text-xl btn btn-ghost text-black hover:text-blue-600">
                <Link to={"/"}>공지사항</Link>
              </summary>
            </details>

            <details className="dropdown">
              <summary className="m-1 text-xl btn btn-ghost text-black hover:text-blue-600">
                <Link to={"/guide"}>미용안내</Link>
              </summary>
            </details>

            <details className="dropdown">
              <summary className="m-1 text-xl btn btn-ghost text-black hover:text-blue-600">
                <Link to={"/reserve/"}>예약하기</Link>
              </summary>
            </details>

            <details className="dropdown">
              <summary className="m-1 text-xl btn btn-ghost text-black hover:text-blue-600">
                <Link to={"/review/"}>리뷰게시판</Link>
              </summary>
            </details>

            <details className="dropdown">
              <summary className="m-1 text-xl btn btn-ghost  text-black hover:text-blue-600">
                공지사항
              </summary>
              <ul className="p-2 shadow menu dropdown-content z-[1] bg-gray-50 rounded-box w-52">
                <li>
                  <Link to={"/"}>자주묻는질문</Link>
                </li>
                <li>
                  <Link to={"/inquiry"}>문의게시판</Link>
                </li>
              </ul>
            </details>
          </ul>
        </div>
        <div className="w-1/7 flex justify-end bg-orange-300 p-4 font-medium">
          {/* 로그인 상태에 따라 Join 항목 렌더링 */}
          {!loginState.m_email && (
            <div className="text-white text-sm m-1 rounded">
              <Link to={"/member/login"}>Login</Link>
            </div>
          )}
          {loginState.m_email && (
            <div className="text-white text-sm m-1 rounded">
              <Link to={"/member/logout"}>Logout</Link>
            </div>
          )}
          {!loginState.m_email && (
            <div className="text-white text-sm m-1 rounded">
              <Link to={"/member/join"}>Join</Link>
            </div>
          )}
          {loginState.m_email && (
            <div className="text-white text-sm m-1 rounded">
              <Link to={"/member/mypage"}>MyPage</Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
