import AboutMenu from "../../member/components/about/AboutMenu";
import BasicMenu from "../../member/components/main/BasicMenu";
import { Link } from "react-router-dom";
import logo from "../../image/rogo1.png";
import de01 from "../../image/mini.jpg";

const ShopLayout = ({ children }) => {
  return (
    <>
      <BasicMenu />

      <aside className="w-1/6 h-full px-3 py-4 overflow-y-auto">
        <AboutMenu />
      </aside>

      <p className="text-xs text-right mb-2 mr-10">
        {" "}
        홈 ＞ 회사소개 ＞<b>디자이너소개</b>
      </p>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="my-1 reveal-from-bottom is-revealed text-2xl font-bold m-1 rounded">
          {children}
        </div>
      </div>

      <section>
        <div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div>
              <img
                src={de01}
                width="40%"
                height="150%"
                alt="int"
                style={{ margin: "0 auto" }}
              />
              {/*  textAlign: "center"중앙정렬 */}
              <h4 className="my-10 text-xl " style={{ textAlign: "center" }}>
                편안한 미용
                <br />
                강아지들이 스트레스 없이
                <br />
                편하게 즐길 수 있는 공간 : P
              </h4>
            </div>
            <div style={{ marginBottom: "20px", marginLeft: "10px" }}>
              <img
                src={de01}
                width="40%"
                height="150%"
                alt="int"
                style={{ margin: "0 auto" }}
              />
              {/*  textAlign: "center"중앙정렬 */}
              <h4 className="my-10 text-xl " style={{ textAlign: "center" }}>
                보호자와 소통
                <br />
                강아지의 미용 / 목욕 전 후
                <br />
                사진과 동영상을 받아보세요!
              </h4>
            </div>
            <div style={{ marginBottom: "20px", marginLeft: "10px" }}>
              <img
                src={de01}
                width="40%"
                height="150%"
                alt="int"
                style={{ margin: "0 auto" }}
              />
              {/*  textAlign: "center"중앙정렬 */}
              <h4 className="my-10 text-xl " style={{ textAlign: "center" }}>
                보호자와 소통
                <br />
                강아지의 미용 / 목욕 전 후
                <br />
                사진과 동영상을 받아보세요!
              </h4>
            </div>
            <div style={{ marginBottom: "20px", marginLeft: "10px" }}>
              <img
                src={de01}
                width="40%"
                height="150%"
                alt="int"
                style={{ margin: "0 auto" }}
              />
              {/*  textAlign: "center"중앙정렬 */}
              <h4 className="my-10 text-xl " style={{ textAlign: "center" }}>
                보호자와 소통
                <br />
                강아지의 미용 / 목욕 전 후
                <br />
                사진과 동영상을 받아보세요!
              </h4>
            </div>
            <div style={{ marginBottom: "20px", marginLeft: "10px" }}>
              <img
                src={de01}
                width="40%"
                height="150%"
                alt="int"
                style={{ margin: "0 auto" }}
              />
              {/*  textAlign: "center"중앙정렬 */}
              <h4 className="my-10 text-xl " style={{ textAlign: "center" }}>
                상담 가능
                <br />
                담당 디자이너가 상주하여
                <br />
                카카오톡 / 고객센터에서 가능!
              </h4>
            </div>
          </div>
        </div>
      </section>

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
