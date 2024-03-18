import ShopMap from "./ShopMap";

const ShopComponents = ({ children, children2}) => {
  return (
    <>
      <br />

      <p className="text-xs text-right mb-2 mr-10">
        {" "}
        홈 ＞ 회사소개 ＞<b>오시는길</b>
      </p>
      {/* 오시는길 작성 */}
      <div
        className="my-1 reveal-from-bottom is-revealed text-2xl font-bold m-1 rounded"
        style={{ display: "flex", justifyContent: "center" }}
      >
        {children}
      </div>

      {/* 지도 */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ShopMap />
      </div>

      {/* 오시는길 주소 및 차량 */}
      <div
        className="my-1 reveal-from-bottom is-revealed text-sm  m-1 rounded "
        style={{ display: "flex", marginLeft: "500px" }}
      >
        {children2}
      </div>
      <br />
      <br />
    </>
  );
};

export default ShopComponents;
