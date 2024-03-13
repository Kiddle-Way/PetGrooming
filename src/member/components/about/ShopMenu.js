import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
//import "./App.css";
import React, { useState } from "react";
// import { kakao } from "kakao/maps/sdk.js"; // 카카오 맵 SDK import
// import { useEffect } from "react";

const ShopMenu = () => {
  const [level, setLevel] = useState(3);
  return (
    <div>
      <Map
        center={{ lat: 33.5563, lng: 126.79581 }}
        style={{ width: "800px", height: "600px" }}
        level={level}
      >
        <CustomOverlayMap position={{ lat: 33.55635, lng: 126.795841 }}>
          <div className="overlay">Here!</div>
        </CustomOverlayMap>
        <button onClick={() => setLevel(level + 1)}>-</button>
        <button onClick={() => setLevel(level - 1)}>+</button>
        {/* //지도에 보여줄 위치 지정 (위도,경도)  */}

        <MapMarker
          style={{ border: "tranparent" }}
          position={{ lat: 37.506320759000715, lng: 127.05368251210247 }}
        >
          {/* //핀 찍힐 위치 */}

          <div
            style={{
              color: "#9971ff",
              fontSize: "19px",
              fontWeight: "700",
              border: "4px solid #9971ff",
              borderRadius: "10px",
              padding: "2.5px",
            }}
          >
            🎬 small box 🎬
          </div>
        </MapMarker>
      </Map>
    </div>
    //핀에 적힐 이름 (위치 이름)
  );
};

export default ShopMenu;




// const { kakao } = window;

// const ShopMenu = () => {
//   // 카카오 맵 SDK 초기화
//   kakao.init("938b208bc9afce304a193020044b3b96");

//   // 함수 선언
//   function createShopMap() {
//     var mapContainer = document.getElementById("map"); // 지도를 표시할 div
//     var mapOption = {
//       center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
//       level: 3, // 지도의 확대 레벨
//     };

//     // 지도를 표시할 div와 지도 옵션으로 지도를 생성합니다
//     var Map = new kakao.maps.Map(mapContainer, mapOption);
//   }

//   // useEffect를 사용하여 컴포넌트가 마운트될 때 createShopMap 함수를 호출합니다.
//   useEffect(() => {
//     createShopMap();
//   }, []);

//   return null;
// };

//export default ShopMenu;
