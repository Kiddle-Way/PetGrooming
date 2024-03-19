import Hero from "../../../image/run.png";
import icon01 from "../../../image/66S.jpg";
import icon02 from "../../../image/88Y.jpg";
import bcon01 from "../../../image/Bshop1.jpg";
import bcon02 from "../../../image/Bshop3.jpg";
import bcon03 from "../../../image/Bshop2.jpg";
import bcon04 from "../../../image/Bshop5.jpg";
import bcon05 from "../../../image/Bshop6.jpg";
import BasicLayout from "../../../common/layouts/BasicLayout";

const MainComponents = ({ children }) => {
  return (
    <>
      <BasicLayout>
        <div>
          <div className=" bg-white my-14 w-full flex space-y-4 md:space-x-4 md:space-y-10">
            <h1
              className="my-1 reveal-from-bottom is-revealed text-5xl
                  font-bold m-1 rounded" //my- margin+bottom
              data-reveal-delay="600" //data-reveal-delay페이지가 로드되거나 사용자가 특정동작을 취할 때 요소를 나타냄
            >
              {children}
            </h1>
          </div>
          {/* Pet Care Servise */}
          <section>
            {/* 사진 */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img src={Hero} width="100%" height="18%" alt="" />
            </div>

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
          {/* 미용실 간단하게 설명 */}
          <section>
            <div style={{ display: "flex" }}>
              <table cellPadding="40%" width="80%" >
                <tr>
                  <td width="50%">
                    <img src={bcon01} alt="int" />
                  </td>
                  <td width="80%">
                    <p>기분좋개 U・ᴥ・U</p>
                    <p>운영시간 오전9부터 오후 6시까지</p>
                    <p>마음을 녹이는 아로마 스파와 머드 마사지</p>
                    <p>편안하개</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>기분좋개 U・ᴥ・U</p>
                    <p>운영시간 오전9부터 오후 6시까지</p>
                    <p>마음을 녹이는 아로마 스파와 머드 마사지</p>
                    <p>편안하개</p>
                  </td>
                  <td>
                    <img src={bcon02} alt="int" />
                  </td>
                </tr>
                <tr>
                  <td width="50%">
                    <img src={bcon03} alt="int" />
                  </td>
                  <td width="80%">
                    <p>기분좋개 U・ᴥ・U</p>
                    <p>운영시간 오전9부터 오후 6시까지</p>
                    <p>마음을 녹이는 아로마 스파와 머드 마사지</p>
                    <p>편안하개</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>기분좋개 U・ᴥ・U</p>
                    <p>운영시간 오전9부터 오후 6시까지</p>
                    <p>마음을 녹이는 아로마 스파와 머드 마사지</p>
                    <p>편안하개</p>
                  </td>
                  <td>
                    <img src={bcon04} alt="int" />
                  </td>
                </tr>
                <tr>
                  <td width="50%">
                    <img src={bcon05} alt="int" />
                  </td>
                  <td width="80%">
                    <p>기분좋개 U・ᴥ・U</p>
                    <p>운영시간 오전9부터 오후 6시까지</p>
                    <p>마음을 녹이는 아로마 스파와 머드 마사지</p>
                    <p>편안하개</p>
                  </td>
                </tr>
              </table>
            </div>
            {/* 첫번째 */}
          </section>
        </div>
      </BasicLayout>
    </>
  );
};
export default MainComponents;
