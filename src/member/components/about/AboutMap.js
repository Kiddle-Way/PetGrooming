import React, { useEffect } from "react";

function AboutMap() {
  // initMap 함수를 useEffect 외부로 이동
  const initMap = () => {
    const { kakao } = window;
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(37.4764353, 126.8799857),
      level: 3,
    };
    new kakao.maps.Map(container, options);
  };

  useEffect(() => {
    // Kakao 지도 SDK 로드 여부를 확인 후 초기화
    if (window.kakao && window.kakao.maps) {
      initMap();
    } else {
      const script = document.createElement("script");
      script.src =
        "https://dapi.kakao.com/v2/maps/sdk.js?appkey=938b208bc9afce304a193020044b3b96&libraries=services";
      document.head.appendChild(script);
      script.onload = () => {
        initMap();
      };
    }
  }, []);

  return (
    <div
      id="map"
      style={{
        width: "500%",
        height: "400px",
        //display: "flex",
        justifyContent: "center",
      }}
    ></div>
  );
}

export default AboutMap;
