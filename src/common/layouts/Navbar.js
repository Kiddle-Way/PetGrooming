import { Link } from "react-router-dom";
import Logo from "../../image/logo12.jpg";

const Navbar = () => {
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

            <details className="dropdown">
              <summary className="m-1 text-xl btn btn-ghost text-black">
                <div className="flex font-medium  text-black hover:text-blue-600 text-sm rounded ">
                  <ul>
                    <li>
                      <Link to={"/login"}>Login</Link>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <Link to={"/join"}>Join US</Link>
                    </li>
                  </ul>
                </div>
              </summary>
            </details>
          </ul>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
