
import ShopComponents from "../../components/about/ShopComponents";

const ShopPage = (children, children2) => {
  return (
    <ShopComponents
      children={
        <div>
          <div>오시는길</div>
        </div>
      }
      children2={
        <div>
          <p>주소 | 서울 금천구 가산디지털1로 101</p>
          <p>
            지하철 | 가산디지털단지역(1,7호선) 8번출구 (에스컬러이터 이용) ＞
            직진 ＞ 왼쪽 버스정류장 지나 ＞ 4거리에서 왼쪽방향으로 (300M)직진 ＞
            농협 앞에서 오른쪽 횡단보도 건너서 정면건물 왼쪽 출입구 B동 3층
          </p>
          <p></p>
        </div>
      }
    />

  );
};

export default ShopPage;
