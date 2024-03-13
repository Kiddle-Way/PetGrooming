import de01 from "../../../image/mini.jpg";

const DesignerComponents = ({ children }) => {
  return (
    <>
      <br />
      <br />
      <p className="text-xs text-right mb-2 mr-10">
        {" "}
        홈 ＞ 회사소개 ＞<b>디자이너소개</b>
      </p>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="my-1 reveal-from-bottom is-revealed text-2xl font-bold m-1 rounded">
          {children}
        </div>
      </div>

      <div className="w-auto h-auto m-auto">
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
    </>
  );
};

export default DesignerComponents;