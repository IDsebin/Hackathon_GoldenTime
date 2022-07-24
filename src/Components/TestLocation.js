/*global kakao*/
/*이거 없으면 컴파일 오류 나옴*/
import React, { useEffect, useState } from "react";

const TestLocation = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  useEffect(() => {
    const geocoder = new kakao.maps.services.Geocoder();

    const getCoordinate = (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        setX(result[0].x);
        setY(result[0].y);
      }
    };

    geocoder.addressSearch(
      "경기도 용인시 처인구 백옥대로1082번길 18", //여기는 서버에서 받은 병원의 좌표를 받아야됨
      getCoordinate
    );
    const container = document.getElementById("map");
    console.log(x); // 디버깅용
    console.log(y); // 디버깅용
    const options = {
      center: new kakao.maps.LatLng(y, x),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
    const markerPosition = new kakao.maps.LatLng(y, x);
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);

    kakao.maps.event.addListener(marker, "click", function () {
      // 마커 위에 이벤트 추가
      console.log("클릭이 되었어염"); //이거 나중에 서버에서 데이터 받을 때 상세페이지로 넘어가는 역할 (프론트에선 일단 라우팅만 하면될듯)
    });
  }); //이거 빈배열로 하면 렌더링 할 때만 이뤄져서 이건 나중에 수정

  return (
    <div>
      <div
        id="map"
        style={{
          width: "500px",
          height: "400px",
          margin: "auto",
          marginTop: "300px",
        }}
      ></div>
    </div>
  );
};
export default TestLocation;
