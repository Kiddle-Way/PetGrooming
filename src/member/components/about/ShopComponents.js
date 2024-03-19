import ShopMap from "./ShopMap";

const ShopComponents = () => {
  return (
    <div className="w-auto">
      <div className="flex w-full">
        <ul>
          <div className="flex justify-end my-9 mr-5">
            홈 ＞ 회사소개 ＞<b>오시는길</b>
          </div>

          <div className="flex justify-center text-3xl font-bold">오시는길</div>

          {/* 지도 */}
          <div className="flex justify-center">
            <ShopMap />
          </div>

          {/* 오시는길 주소 및 차량 */}
          <div className="flex flex-col space-y-2 justify-center text-xl font-medium mx-48 mb-10 ">
            <div>📍 주소 : 서울 금천구 가산디지털1로 101</div>
            <div>📍 지하철 이용시 이동 경로</div>
            <div className="text-base">
              가산디지털단지역(1,7호선) 8번출구 (에스컬러이터 이용) ▶ 직진 ▶
              왼쪽 버스정류장 지나 ▶ 4거리에서 왼쪽방향으로 (300M)직진 ▶ 농협
              앞에서 오른쪽 횡단보도 건너서 정면건물 왼쪽 출입구 B동 3층
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default ShopComponents;
