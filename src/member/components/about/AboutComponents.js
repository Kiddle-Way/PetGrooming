import greet from "../../../image/gre.png";

const AboutComponents = () => {
  return (
    <div className=" w-auto">
      <div className="flex justify-end my-9 mr-5">
        홈 ＞ 회사소개 ＞<b>인사말</b>
      </div>

      <div className="flex justify-center my-10">
        <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-5xl">
          환영합니다!&nbsp;
          <span class="text-transparent bg-clip-text bg-gradient-to-r to-amber-600 from-yellow-400">
            펫 구루밍 입니다.
          </span>
        </h1>
      </div>

      <div className="flex justify-center">
        <img src={greet} alt="인사 이미지" className="mx-auto" />
      </div>
      <div className="flex justify-center my-16 text-xl font-bold text-start">
        📌 가족처럼 생각합니다.
        <br />
        📌 편안하게 즐기다 갈수있게 합니다.
        <br />
        📌 문의는 언제나 환영합니다.
        <br />
        📌 경력 최소 5년 이상의 디자이너로 이루어져 있습니다.
        <br />
        📌 신속 정확!
        <br />
      </div>
    </div>
  );
};

export default AboutComponents;
