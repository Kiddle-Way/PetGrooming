import AboutMenu from "../../member/components/about/AboutMenu";
import BasicMenu from "../../member/components/main/BasicMenu";
import { Link } from "react-router-dom";
import greet from "../../image/gre.png";
import logo from "../../image/rogo1.png";

const AboutLayout = ({ children }) => {
  return (
    <>
      <BasicMenu />

      <aside className="w-1/6 h-full px-3 py-4 overflow-y-auto">
        <AboutMenu />
      </aside>

      <p className="text-xs text-right mb-2 mr-10">
        {" "}
        홈 ＞ 회사소개 ＞<b>인사말</b>
      </p>

      {/* 인사말 */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="my-1 reveal-from-bottom is-revealed text-2xl font-bold m-1 rounded">
          {children}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ul>
          <br />
          <img
            src={greet}
            width="80%"
            height="5%"
            alt="greet"
            style={{ margin: "0 auto" }}
          />
        </ul>
        <ul>
          <li
            className="my-16 text-xl font-bold "
            style={{ textAlign: "center" }}
          >
            <br />
            <li className="my-5 text-xl " style={{ textAlign: "center" }}>
              {" "}
              가족처럼 생각합니다.
              <li className="my-5 text-xl " style={{ textAlign: "center" }}>
                {" "}
                편안하게 즐기다 갈수있게 합니다.
                <li className="my-5 text-xl " style={{ textAlign: "center" }}>
                  {" "}
                  문의는 언제나 환영합니다.
                  <li className="my-5 text-xl " style={{ textAlign: "center" }}>
                    {" "}
                    신속 정확!
                    <li
                      className="my-5 text-xl "
                      style={{ textAlign: "center" }}
                    >
                      {" "}
                      경력 최소 5년이상의 디자이너로 이루어져 있습니다.
                      <li
                        className="my-5 text-xl "
                        style={{ textAlign: "center" }}
                      >
                        {" "}
                        편안하게 즐기다 갈수있게 합니다.
                        <li
                          className="my-5 text-xl "
                          style={{ textAlign: "center" }}
                        >
                          {" "}
                          문의는 언제나 환영합니다.
                          <li
                            className="my-5 text-xl "
                            style={{ textAlign: "center" }}
                          >
                            {" "}
                            신속 정확!
                            <li
                              className="my-5 text-xl "
                              style={{ textAlign: "center" }}
                            >
                              {" "}
                              경력 최소 5년이상의 디자이너로 이루어져 있습니다.
                            </li>
                          </li>
                        </li>
                      </li>
                    </li>
                  </li>
                </li>
              </li>
            </li>
          </li>
        </ul>
      </div>

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
export default AboutLayout;
