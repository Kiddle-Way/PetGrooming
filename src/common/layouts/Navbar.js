import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "../../image/logo12.jpg";
import { useState } from "react";

const Navbar = () => {
  const loginState = useSelector((state) => state.loginSlice);

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
                  <Link to={"/"}>문의게시판</Link>
                </li>
              </ul>
            </details>
          </ul>
        </div>
        <div className="flex items-end justify-end ml-6 outline outline-orange-400 rounded-3xl">
          <ul className="w-1/7 flex justify-end p-1 font-semibold ">
            {!loginState.m_email ? (
              <li className="text-black text-sm m-2 hover:text-blue-600">
                <Link to={"/member/login"}>로그인</Link>
              </li>
            ) : (
              <li className="text-black text-sm m-2 hover:text-blue-600">
                <Link to={"/member/logout"}>로그아웃</Link>
              </li>
            )}
          </ul>
          <div className="w-1/7 flex justify-end p-1 font-semibold">
            <div className="text-black text-sm m-2 hover:text-blue-600">
              <Link to={"/member/join"}>회원가입</Link>
            </div>
          </div>
          <div className="w-1/7 flex justify-end p-1 font-semibold ">
            <div className="text-black text-sm m-2 hover:text-blue-600">
              <Link to={"/member/mypage"}>마이페이지</Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
