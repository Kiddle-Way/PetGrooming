import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../image/logo12.jpg";

const BasicLayout = ({ children }) => {
  const [expandedMenu, setExpandedMenu] = useState(null);

  // 이미지 호버 효과를 위한 useEffect
  useEffect(() => {
    const rolloverElements = document.querySelectorAll(".rollover");

    rolloverElements.forEach((aTag) => {
      const imgTag = aTag.querySelector("img");
      if (imgTag) {
        const offStr = imgTag.getAttribute("src");
        const onStr = offStr.replace("_off", "_on");

        // 마우스 호버 이벤트 핸들러
        const handleMouseOver = () => imgTag.setAttribute("src", onStr);
        const handleMouseOut = () => imgTag.setAttribute("src", offStr);

        // 이벤트 리스너 등록
        aTag.addEventListener("mouseover", handleMouseOver);
        aTag.addEventListener("mouseout", handleMouseOut);

        // 컴포넌트 언마운트 시 이벤트 리스너 제거
        return () => {
          aTag.removeEventListener("mouseover", handleMouseOver);
          aTag.removeEventListener("mouseout", handleMouseOut);
        };
      }
    });
  }, []); // Empty array as dependency to run the effect only once

  // 서브 메뉴 클릭, 메뉴 호버 이벤트 핸들러
  const handleSubMenuClick = () => {
    // 하위 메뉴를 클릭해도 메뉴가 유지되도록 아무런 작업을 하지 않습니다.
  };

  const handleMenuItemHover = (menuName) => setExpandedMenu(menuName);
  const handleMenuHover = () => setExpandedMenu(null);

  return (
    <>
      <header>
        <nav style={{ display: "flex" }}>
          <div className="w-3/4 bg-amber-400 ml-auto">
            <ul className="flex text-white font-bold">
              {" "}
              {/* ml-auto를 사용하여 우측 정렬 */}
              <Link to={"/"}>
                <img
                  src={logo}
                  width="20%"
                  height="10%"
                  alt="Open"
                  style={{ position: "absolute", top: 0, left: 10 }}
                />
              </Link>
              {/* 회사소개 메뉴 */}
              <li
                onMouseEnter={() => handleMenuItemHover("About")}
                onMouseLeave={handleMenuHover}
                className="pr-10 ml-auto p-4"
              >
                <span style={{ fontSize: "24px" }}>
                  <Link to={"/about"}>회사소개</Link>
                </span>
                {/* 회사소개 서브 메뉴 */}
                {expandedMenu === "About" && (
                  <ul
                    onMouseEnter={handleSubMenuClick}
                    onMouseLeave={handleMenuHover}
                    className="ml-2"
                    // 서브 메뉴는 왼쪽으로 조금 이동
                  >
                    <li>
                      <Link to={"/about"}>인사말</Link>
                    </li>
                    <li>
                      <Link to={"/about/designer"}>디자이너소개</Link>
                    </li>
                    <li>
                      <Link to={"/about/shop"}>오시는길</Link>
                    </li>
                  </ul>
                )}
              </li>
              {/* 공지사항 메뉴 */}
              <li className="pr-10 p-4" style={{ fontSize: "24px" }}>
                <Link to={"/notice"}>공지사항</Link>
              </li>
              {/* 미용안내 메뉴 */}
              <li className="pr-10 p-4" style={{ fontSize: "24px" }}>
                <Link to={"/guide"}>미용안내</Link>
              </li>
              {/* 로그인 후 가능한 페이지 */}
              {/* 예약하기 메뉴 */}
              <li className="pr-10 p-4" style={{ fontSize: "24px" }}>
                <Link to={"/reserve"}>예약하기</Link>
              </li>
              {/* 리뷰게시판 메뉴 */}
              <li className="pr-10 p-4" style={{ fontSize: "24px" }}>
                <Link to={"/review"}>리뷰게시판</Link>
              </li>
              {/* 고객센터 메뉴 */}
              <li
                onMouseEnter={() => handleMenuItemHover("Customer")}
                onMouseLeave={handleMenuHover}
                className="pr-10 p-4 "
                style={{ fontSize: "24px" }}
              >
                <Link to={"/Q&A"}>고객센터</Link>
                {/*고객센터서브 메뉴 */}
                {expandedMenu === "Customer" && (
                  <ul
                    onMouseEnter={handleSubMenuClick}
                    onMouseLeave={handleMenuHover}
                  >
                    <li>
                      <Link to={"/Q&A"}>자주묻는질문</Link>
                    </li>
                    <li>
                      <Link to={"/inquiry"}>문의게시판</Link>
                    </li>
                  </ul>
                )}
              </li>
              {/* 로그인 링크 */}
              <div className="flex  p-4 font-medium text-white text-sm m-1 rounded ">
                <ul>
                  <li>
                    <Link to={"/login"}>Login</Link>
                    {" | "}
                    <Link to={"/join"}>Join US</Link>
                  </li>
                </ul>
              </div>
            </ul>
          </div>
        </nav>
      </header>
      <div>{children}</div>
      <footer>
        <div>
          <Link to={"/"}>
            <img
              src={logo}
              width="15%"
              height="80%"
              alt="Open"
              style={{ float: "left", left: "20" }}
            />
          </Link>
        </div>
        <div style={{ textAlign: "center" }}>
          <span>
            <Link to={"/"}> 이용약관 </Link>
            {"|"}
            <Link to={"/"}> 개인정보취급방침</Link>
          </span>
          <h2>
            Pet Grooming 서울 금천구 가산디지털1로 101 | T.02-2671-2134 | F.
            02-2671-2133{" "}
          </h2>
          <p>Copyright 펫구루밍. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
};
export default BasicLayout;
