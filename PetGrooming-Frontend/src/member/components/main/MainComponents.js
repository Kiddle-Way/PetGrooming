import 배너1 from "../../../image/배너2.jpg";
import 배너2 from "../../../image/배너1.jpg";
import 배너3 from "../../../image/배너3.jpg";
import icon01 from "../../../image/66S.jpg";
import icon02 from "../../../image/88Y.jpg";
import bcon01 from "../../../image/Bshop1.jpg";
import bcon02 from "../../../image/Bshop3.jpg";
import bcon03 from "../../../image/Bshop2.jpg";
import bcon04 from "../../../image/Bshop5.jpg";
import BasicLayout from "../../../common/layouts/BasicLayout";
import { useRef, useEffect } from "react";

const MainComponents = () => {
  const carouselElement = useRef(null);

  useEffect(() => {
    if (carouselElement.current) {
    }
  }, [carouselElement]);

  const scrollCarousel = (targetImageNumber) => {
    const carouselWidth = carouselElement.current.clientWidth;
    const targetImage = targetImageNumber - 1;
    const targetXPixel = carouselWidth * targetImage + 1;

    carouselElement.current.scrollTo(targetXPixel, 0);
  };
  return (
    <>
      <BasicLayout>
        <div>
          <div className=" bg-amber-50 rounded-3xl my-6 w-full h-12 flex space-y-4 md:space-x-4 md:space-y-10">
            <div className="w-full m-auto -mb-14 text-4xl font-medium font-mono text-center ">
              <p>세상 예쁘개, 세상 편하개</p>
              <p>Pet Grooming</p>
            </div>
          </div>

          <section>
            <div
              className="flex carousel mx-auto max-w-screen-xl my-16 rounded-3xl"
              ref={carouselElement}
            >
              <div className="carousel-item relative w-full ">
                <img
                  src={배너1}
                  className="flex mx-auto aspect-w-16 aspect-h-9 object-cover"
                  alt=""
                />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <button
                    onClick={() => scrollCarousel(3)}
                    className="btn btn-circle"
                  >
                    ❮
                  </button>
                  <button
                    onClick={() => scrollCarousel(2)}
                    className="btn btn-circle"
                  >
                    ❯
                  </button>
                </div>
              </div>
              <div className="carousel-item relative w-full">
                <img
                  src={배너2}
                  className="flex mx-auto aspect-w-16 aspect-h-9 object-cover"
                  alt=""
                />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <button
                    onClick={() => scrollCarousel(1)}
                    className="btn btn-circle"
                  >
                    ❮
                  </button>
                  <button
                    onClick={() => scrollCarousel(3)}
                    className="btn btn-circle"
                  >
                    ❯
                  </button>
                </div>
              </div>
              <div className="carousel-item relative w-full">
                <img
                  src={배너3}
                  className="flex mx-auto aspect-w-16 aspect-h-9 object-cover"
                  alt=""
                />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <button
                    onClick={() => scrollCarousel(2)}
                    className="btn btn-circle"
                  >
                    ❮
                  </button>
                  <button
                    onClick={() => scrollCarousel(1)}
                    className="btn btn-circle"
                  >
                    ❯
                  </button>
                </div>
              </div>
            </div>

            <div className="my-10">
              <div>
                <h5 className="flex justify-center reveal-from-bottom text-4xl font-bold m-1 rounded mb-14">
                  Pet Care Servise
                </h5>
              </div>

              <div>
                <div className="flex items-center justify-center">
                  <div className="mx-10">
                    <img
                      src={icon01}
                      width="40%"
                      height="150%"
                      alt="int"
                      className="mx-auto"
                    />
                    <h4 className="my-10 text-xl text-center ">
                      편안한 미용
                      <br />
                      강아지들이 스트레스 없이
                      <br />
                      편하게 즐길 수 있는 공간 : P
                    </h4>
                  </div>
                  <div className="mx-10">
                    <img
                      src={icon01}
                      width="40%"
                      height="150%"
                      alt="int"
                      className="mx-auto"
                    />
                    <h4 className="my-10 text-xl text-center ">
                      보호자와 소통
                      <br />
                      강아지의 미용 / 목욕 전 후
                      <br />
                      사진과 동영상을 받아보세요!
                    </h4>
                  </div>
                  <div className="mx-10">
                    <img
                      src={icon01}
                      width="40%"
                      height="150%"
                      alt="int"
                      className="mx-auto"
                    />
                    <h4 className="my-10 text-xl text-center">
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
              <h5 className="flex justify-center reveal-from-bottom text-4xl font-bold m-1 rounded">
                {/* 디자이너 수 | 펫구루밍 이용 강아지 수 */}
              </h5>
              <div className="flex justify-center">
                <div>
                  <img
                    src={icon02}
                    width="30%"
                    height="150%"
                    alt="int"
                    className="mx-auto"
                  />
                  <h4 className="my-10 text-lg text-center ">
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
                    className="mx-auto"
                  />
                  <h4 className="my-10 text-lg text-center ">
                    이용 강아지 수
                    <br />
                    1560 마리
                  </h4>
                </div>
              </div>
            </div>
          </section>
          {/* 미용실 간단하게 설명 */}
          <section>
            <div className=" flex justify-center">
              <table className="text-xl" cellPadding="40%" width="80%">
                <tr>
                  <td width="50%">
                    <img src={bcon01} alt="int" className="rounded-3xl" />
                  </td>
                  <td width="80%">
                    <p>마음을 녹이는 아로마 스파와 머드 마사지로</p>
                    <p>반려견의 피로와 스트레스를 풀어드립니다.</p>
                  </td>
                </tr>
                <tr className="text-end">
                  <td>
                    <p>전문적인 애견 미용사들의</p>
                    <p>트렌디한 스타일링으로</p>
                    <p>최고의 아름다움을 제시합니다.</p>
                  </td>
                  <td>
                    <img src={bcon02} alt="int" className="rounded-3xl" />
                  </td>
                </tr>
                <tr>
                  <td width="50%">
                    <img src={bcon03} alt="int" className="rounded-3xl" />
                  </td>
                  <td width="80%">
                    <p>언제나 새로운 스타일을 연구하고</p>
                    <p>체계적인 프리미엄 뷰티 서비스로</p>
                    <p>고객 감동을 이어갑니다.</p>
                  </td>
                </tr>
                <tr className="text-end">
                  <td>
                    <p>운영시간 오전9부터 오후 9시까지</p>
                    <p>고객님들이 퇴근한 이후에도</p>
                    <p>저희는 동일하게 열려있습니다 </p>
                  </td>
                  <td>
                    <img src={bcon04} alt="int" className="rounded-3xl" />
                  </td>
                </tr>
              </table>
            </div>
          </section>
        </div>
      </BasicLayout>
    </>
  );
};
export default MainComponents;
