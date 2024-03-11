//import React, { useEffect, useState } from 'react';
import BasicMenu from "../../member/components/main/BasicMenu";
import { Link } from "react-router-dom";
import logo from "../../image/rogo1.png";
import Hero from "../../image/run.png";
import icon01 from "../../image/66S.jpg";
import icon02 from "../../image/88Y.jpg";
import bcon01 from "../../image/21.jpg";
import bcon02 from "../../image/cB.jpg";
import bcon03 from "../../image/ccB.jpg";
import bcon04 from "../../image/sB.jpg";

const BasicLayout = ({ children }) => {
  return (
    <>
      <div>
        <BasicMenu></BasicMenu>
      </div>
      <main className="site-content">
        <section>
          <div>
            <div>
              <div className=" bg-white my-14 w-full flex space-y-4 md:space-x-4 md:space-y-10">
                <h1
                  className="my-1 reveal-from-bottom is-revealed text-5xl  
                  font-bold m-1 rounded" //my- margin+bottom
                  data-reveal-delay="600" //data-reveal-delay페이지가 로드되거나 사용자가 특정동작을 취할 때 요소를 나타냄
                >
                  {/* {children} */}
                </h1>
              </div>
              {/* 사진 */}
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img src={Hero} width="100%" height="18%" alt="" />
              </div>
            </div>
          </div>
        </section>
        {/* Pet Care Servise */}
        <section>
          <div className="">
            <div className="my1">
              <h5
                className="reveal-from-bottom text-4xl font-bold m-1 rounded"
                style={{ display: "flex", justifyContent: "center" }}
              >
                Pet Care Servise
              </h5>
              <br />
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div>
                  <img
                    src={icon01}
                    width="40%"
                    height="150%"
                    alt="int"
                    style={{ margin: "0 auto" }}
                  />
                  {/*  textAlign: "center"중앙정렬 */}
                  <h4
                    className="my-10 text-xl "
                    style={{ textAlign: "center" }}
                  >
                    편안한 미용
                    <br />
                    강아지들이 스트레스 없이
                    <br />
                    편하게 즐길 수 있는 공간 : P
                  </h4>
                </div>
                <div style={{ marginBottom: "20px", marginLeft: "10px" }}>
                  <img
                    src={icon01}
                    width="40%"
                    height="150%"
                    alt="int"
                    style={{ margin: "0 auto" }}
                  />
                  {/*  textAlign: "center"중앙정렬 */}
                  <h4
                    className="my-10 text-xl "
                    style={{ textAlign: "center" }}
                  >
                    보호자와 소통
                    <br />
                    강아지의 미용 / 목욕 전 후
                    <br />
                    사진과 동영상을 받아보세요!
                  </h4>
                </div>
                <div style={{ marginBottom: "20px", marginLeft: "10px" }}>
                  <img
                    src={icon01}
                    width="40%"
                    height="150%"
                    alt="int"
                    style={{ margin: "0 auto" }}
                  />
                  {/*  textAlign: "center"중앙정렬 */}
                  <h4
                    className="my-10 text-xl "
                    style={{ textAlign: "center" }}
                  >
                    상담 가능
                    <br />
                    담당 디자이너가 상주하여
                    <br />
                    카카오톡 / 고객센터에서 가능!
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-auto">
          <div>
            <div className="my-1">
              <h5
                className="reveal-from-bottom text-4xl font-bold m-1 rounded"
                style={{ display: "flex", justifyContent: "center" }}
              >
                {/* 디자이너 수 | 펫구루밍 이용 강아지 수 */}
              </h5>
              <br />
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div>
                  <img
                    src={icon02}
                    width="30%"
                    height="150%"
                    alt="int"
                    style={{ margin: "0 auto" }}
                  />
                  {/*  textAlign: "center"중앙정렬 */}
                  <h4
                    className="my-10 text-lg "
                    style={{ textAlign: "center" }}
                  >
                    디자이너 수
                    <br />
                    5명
                  </h4>
                </div>
                <div>
                  <img
                    src={icon02}
                    width="30%"
                    height="150"
                    alt="int"
                    style={{ margin: "0 auto" }}
                  />
                  {/*  textAlign: "center"중앙정렬 */}
                  <h4
                    className="my-10 text-lg "
                    style={{ textAlign: "center" }}
                  >
                    이용 강아지 수
                    <br />
                    1560 마리
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-auto">
          <div>
            <div className="my-1">
              <h5
                className="reveal-from-bottom text-4xl font-bold m-1 rounded"
                style={{ display: "flex", justifyContent: "center" }}
              >
                {/* 미용서비스 간단하게 설명 */}
              </h5>
              <br />
            </div>

            <div>
              <div style={{ display: "" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img src={bcon01} width="20%" height="150%" alt="int" />
                  <h4
                    className="my-10 text-lg "
                    style={{ textAlign: "center" }}
                  >
                    목욕 <br /> 1560 마리{" "}
                  </h4>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <h4 className="my-10 text-lg ">
                    클리핑 <br /> 1560 마리{" "}
                  </h4>
                  <img
                    src={bcon02}
                    width="20%"
                    height="150"
                    alt="int"
                    style={{ margin: "0 auto" }}
                  />
                </div>

                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={bcon03}
                    width="20%"
                    height="150%"
                    alt="int"
                    style={{ margin: "0 auto" }}
                  />
                  <h4 className="my-10 text-lg ">
                    스포팅 <br /> 1560 마리{" "}
                  </h4>
                </div>

                <div style={{ display: "flex", alignItems: "center" }}>
                  <h4 className="my-10 text-lg ">
                    이가위컷 <br /> 1560 마리{" "}
                  </h4>
                  <img
                    src={bcon04}
                    width="20%"
                    height="150"
                    alt="int"
                    style={{ margin: "0 auto" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer>
          <div>
            <Link to={"/"}>
              <img
                src={logo}
                width="15%"
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
      </main>
    </>
  );
};
export default BasicLayout;
