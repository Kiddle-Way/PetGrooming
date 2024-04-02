import { Link } from "react-router-dom";
import Logo from "../../image/logo12.jpg";

const Navbar = () => {
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
    <div className="container mx-auto h-auto">
      <nav className="navbar bg-gray-50 border-gray-200 dark:bg-gray-900 dark:border-gray-700 border-b">
        <div className="flex-1">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mb-1 mr-5">
            <Link to={"/statistics/sales"}>
              <img src={Logo} className="h-20" alt="" />
            </Link>
          </div>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <details className="dropdown">
              <summary className="m-1 text-xl btn btn-ghost text-gray-600">
                예약관리
              </summary>
              <ul className="p-2 shadow menu dropdown-content z-[1] bg-gray-50 rounded-box w-52">
                <li>
                  <Link to={"/reserve/list"}>예약 내역</Link>
                </li>
                <li>
                  <Link to={"/reserve/list/past"}>지난 예약</Link>
                </li>
              </ul>
            </details>

            <details className="dropdown">
              <summary className="m-1 text-xl btn btn-ghost text-gray-600">
                상품관리
              </summary>
              <ul className="p-2 shadow menu dropdown-content z-[1] bg-gray-50 rounded-box w-52">
                <li>
                  <Link to={"/product/"}>상품 목록</Link>
                </li>
                <li>
                  <Link to={"/product/guide/"}>미용 안내</Link>
                </li>
              </ul>
            </details>

            <details className="dropdown">
              <summary className="m-1 text-xl btn btn-ghost text-gray-600">
                <Link to={"/designer/list/"}>디자이너관리</Link>
              </summary>
            </details>

            <details className="dropdown">
              <summary className="m-1 text-xl btn btn-ghost text-gray-600">
                <Link to={"/member/list"}>회원관리</Link>
              </summary>
            </details>

            <details className="dropdown">
              <summary className="m-1 text-xl btn btn-ghost text-gray-600">
                <Link to={"/notice/"}>공지사항관리</Link>
              </summary>
            </details>

            <details className="dropdown">
              <summary className="m-1 text-xl btn btn-ghost text-gray-600">
                고객센터관리
              </summary>
              <ul className="p-2 shadow menu dropdown-content z-[1] bg-gray-50 rounded-box w-52">
                <li>
                  <Link to={"/faq/list"}>자주 묻는 질문</Link>
                </li>
                <li>
                  <Link to={"/inquiryAnswer/list"}>문의 게시판</Link>
                </li>
              </ul>
            </details>
            <details className="dropdown">
              <summary className="m-1 text-xl btn btn-ghost text-gray-600">
                <Link to={"/reviewAnswer/"}>리뷰게시판</Link>
              </summary>
            </details>

            <details className="dropdown">
              <summary className="m-1 text-xl btn btn-ghost text-gray-600">
                통계
              </summary>
              <ul className="p-2 shadow menu dropdown-content z-[1] bg-gray-50 rounded-box w-52">
                <li>
                  <Link to={"/statistics/sales"}>매출 통계</Link>
                </li>
                <li>
                  <Link to={"/statistics/reserve"}>예약 통계</Link>
                </li>
                <li>
                  <Link to={"/statistics/breed"}>견종별 예약 통계</Link>
                </li>
              </ul>
            </details>

            <details className="dropdown">
              <summary className="m-1 text-xl btn btn-ghost text-gray-600">
                로그아웃
              </summary>
            </details>
          </ul>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
