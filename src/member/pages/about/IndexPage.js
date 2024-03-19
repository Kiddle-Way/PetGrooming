import { Outlet } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BasicLayout from "../../../common/layouts/BasicLayout";

const IndexPage = () => {
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
    <BasicLayout>
      <br />
      <br />
      <br />
      <nav style={{ display: "flex" }}>
        <div
          className="w-1/6 bg-amber-400"
          style={{ position: "absolute", left: 10 }}
        >
          <ul className="flex text-white font-bold">
            {/* 회사소개 메뉴 */}
            <li
              onMouseEnter={() => handleMenuItemHover("About")}
              onMouseLeave={handleMenuHover}
              className="pr-10 ml-auto p-4"
            >
              <Link to={"/about"} style={{ fontSize: "24px" }}>
                회사소개
              </Link>

              {/* 회사소개 서브 메뉴 */}
              {expandedMenu === "About" && (
                <ul
                  onMouseEnter={handleSubMenuClick}
                  onMouseLeave={handleMenuHover}
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
          </ul>
        </div>
      </nav>
      <Outlet />
    </BasicLayout>
  );
};

export default IndexPage;
