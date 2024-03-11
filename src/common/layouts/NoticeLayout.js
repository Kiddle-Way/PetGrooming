import AboutMenu from "../../member/components/about/AboutMenu";
import BasicMenu from "../../member/components/main/BasicMenu";

const NoticeLayout = ({ children }) => {
  return (
    <>
      <BasicMenu />

      <aside className="w-1/6 h-full px-3 py-4 overflow-y-auto">
        <AboutMenu />
      </aside>

      <p className="text-xs text-right mb-2 mr-10">
        {" "}
        홈 ＞ <b>공지사항</b>
      </p>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="my-1 reveal-from-bottom is-revealed text-2xl font-bold m-1 rounded">
          {children}
        </div>
      </div>
    </>
  );
};

export default NoticeLayout;
