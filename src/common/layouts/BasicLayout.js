import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

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
      <div className="container mx-auto h-auto">
        <Navbar />

        <main className="container mx-auto h-auto w-full bg-white">
          <div className="flex">{children}</div>
        </main>

        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
};
export default BasicLayout;
