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

  window.addEventListener("click", function (e) {
    document.querySelectorAll(".dropdown").forEach(function (dropdown) {
      if (!dropdown.contains(e.target)) {
        // Click was outside the dropdown, close it
        dropdown.open = false;
      }
    });
  });
  
  return (
    <div className="container mt-2">
      <nav className="rounded-2xl flex justify-center navbar outline outline-4 outline-amber-400 dark:bg-gray-900 dark:border-gray-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mb-1 mr-5">
          <Link to={"/"}>
            <img src={Logo} className="h-28" alt="" />
          </Link>
        </div>
        <div className="flex-none">
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
                <Link to={"/memnotice"}>공지사항</Link>
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
                고객센터
              </summary>
              <ul className="p-2 shadow menu dropdown-content z-[1] bg-gray-50 rounded-box w-52">
                <li>
                  <Link to={"/memberqna"}>자주묻는질문</Link>
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
            <>
              <div className="text-white text-sm m-1 rounded">
                <Link to={"/member/logout"}>Logout</Link>
              </div>
              <div className="text-white text-sm m-1 rounded">
                <Link to={"/member/mypage"}>MyPage</Link>
              </div>
              {/* 관리자인 경우에만 표시 */}
              {loginState.isAdmin && (
                <div className="text-white text-sm m-1 rounded">
                  <Link to={"/designer/list"}>Admin</Link>
                </div>
              )}
            </>
          )}
          {!loginState.m_email && (
            <div className="text-white text-sm m-1 rounded">
              <Link to={"/member/join"}>Join</Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;