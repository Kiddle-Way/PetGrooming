import AboutMenu from "../../member/components/about/AboutMenu";
import BasicMenu from "../../member/components/main/BasicMenu";
import { Link } from "react-router-dom";
import logo from "../../image/rogo1.png";
import AboutMap from "../../member/components/about/AboutMap";

const ShopLayout = ({ children }) => {
  return (
    <>
      <BasicMenu />

      <aside className="w-1/6 h-full px-3 py-4 overflow-y-auto">
        <AboutMenu />
      </aside>

      <p className="text-xs text-right mb-2 mr-10">
        {" "}
        홈 ＞ 회사소개 ＞<b>오시는길</b>
      </p>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="my-1 reveal-from-bottom is-revealed text-2xl font-bold m-1 rounded">
          {children}
        </div>
      </div>
        <AboutMap/>
      

      <footer>
        <div>
          <Link to={"/"}>
            <img
              src={logo}
              width="10%"
              height="80%"
              alt="Open"
              style={{ float: "left" }}
            />
          </Link>
        </div>
        <div style={{ textAlign: "center" }}>
          <h2>이용약관 | 개인 정보취급방침</h2>
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
export default ShopLayout;
