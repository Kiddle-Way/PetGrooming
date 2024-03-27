import greet from "../../../image/gre.png";

const AboutComponents = ({ children }) => {
  return (
    <div className=" w-auto">
      <div className="flex justify-end mt-1 mb-9 mr-5">
        홈 ＞ 회사소개 ＞<b>인사말</b>
      </div>

      {/* 인사말 */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="my-1 reveal-from-bottom is-revealed text-2xl font-bold m-1 rounded ">
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
        <ul
          className="my-16 text-xl font-bold "
          style={{ textAlign: "center" }}
        >
          <br />
          <li
            className="my-16 text-xl font-bold"
            style={{ textAlign: "center" }}
          >
            <br />
            가족처럼 생각합니다.
          </li>
          <li className="my-5 text-xl" style={{ textAlign: "center" }}>
            편안하게 즐기다 갈수있게 합니다.
          </li>
          <li className="my-5 text-xl" style={{ textAlign: "center" }}>
            문의는 언제나 환영합니다.
          </li>
          <li className="my-5 text-xl" style={{ textAlign: "center" }}>
            신속 정확!
          </li>
          <li className="my-5 text-xl" style={{ textAlign: "center" }}>
            경력 최소 5년 이상의 디자이너로 이루어져 있습니다.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AboutComponents;
