import React, { useEffect } from "react";

function ShopMap() {
  useEffect(() => {
    // 카카오 맵 스크립트를 동적으로 생성하여 추가
    const script = document.createElement("script");
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=938b208bc9afce304a193020044b3b96";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // 지도를 표시할 div 요소 선택
      const container = document.getElementById("map");
      // 지도 옵션 설정
      const options = {
        center: new window.kakao.maps.LatLng(37.4764353, 126.8799857), // 초기 중심 좌표
        level: 3, // 초기 확대 레벨
      };

      // 지도 객체 생성
      const map = new window.kakao.maps.Map(container, options);

      // 초기 마커 생성 및 지도에 추가
      let marker = new window.kakao.maps.Marker({
        map: map,
        position: map.getCenter(),
      });

      // 마커 클릭 시 인포윈도우 생성 및 표시
      let infowindow = new window.kakao.maps.InfoWindow({
        content:
          '<div style="padding:5px;">Pet Grooming | T.02-2671-2134 </div>',
      });

      window.kakao.maps.event.addListener(marker, "click", function () {
        infowindow.open(map, marker);
      });

      // 지도를 클릭할 때마다 마커의 위치를 클릭한 위치로 변경하는 이벤트 설정
      window.kakao.maps.event.addListener(map, "click", function (event) {
        marker.setPosition(event.latLng);
        infowindow.close(); // 지도 클릭 시 인포윈도우 닫기
      });
    };

    // 컴포넌트 언마운트 시 스크립트 제거
    return () => {
      document.body.removeChild(script);
    };
  }, []); // useEffect 의존성 배열은 빈 배열로 지정하여 한 번만 실행되도록 설정

  // 지도를 표시할 div 요소 반환
  return <div id="map" className="w-2/3 h-96 flex justify-center m-10"></div>;
}
export default ShopMap;
