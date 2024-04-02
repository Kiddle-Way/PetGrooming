import { useState, useEffect } from "react";

function useCountUp(end, start = 0, duration = 2000) {
  const [count, setCount] = useState(start); // 현재 카운트 상태

  useEffect(() => {
    let startTime; // 애니메이션 시작 시간
    let requestId; // requestAnimationFrame 요청 ID

    // 애니메이션을 실행하는 함수입니다.
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp; // 시작 시간
      const progress = timestamp - startTime; // 경과 시간
      const percentage = Math.min(progress / duration, 1); // 진행률(0~1 사이의 값)을 계산

      const distance = end - start; // 시작과 종료 값 사이의 거리를 계산
      let acceleration = 2; // 가속도를 높여서 더 빠르게 숫자가 올라가도록 설정
      let deceleration = 1; // 감속도를 높여서 숫자가 마지막에 천천히 멈추도록 

      // 가속도와 감속도를 적용하여 값을 계산
      const currentValue =
        start +
        (distance * (1 - Math.pow(1 - percentage, acceleration))) /
          (1 - Math.pow(percentage, deceleration));

      // 현재 값이 목표 값보다 크거나 같으면 종료합니다.
      if (currentValue >= end) {
        setCount(end);
      } else {
        // 현재 값이 목표 값보다 작으면 소수점 이하를 버림하여 설정합니다.
        setCount(Math.floor(currentValue));
        // requestAnimationFrame으로 animate 함수를 재귀적으로 호출하여 애니메이션을 계속 진행합니다.
        requestId = requestAnimationFrame(animate);
      }
    };

    // requestAnimationFrame으로 animate 함수를 호출하여 애니메이션을 시작합니다.
    requestId = requestAnimationFrame(animate);

    // useEffect 클린업 함수에서 requestAnimationFrame을 취소하여 메모리 누수를 방지합니다.
    return () => cancelAnimationFrame(requestId);
  }, [end, start, duration]);

  return count; // 현재 카운트 상태를 반환합니다.
}

export default useCountUp;