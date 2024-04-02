import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getMyReservations,
  removeRequest,
} from "../../../common/api/reserveApi";
import { getCookie } from "../../../common/util/cookieUtil";

const MyReservationComponent = () => {
  const [reservations, setReservations] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

   // 함수를 사용하여 시간 열거형 값을 형식화하는 함수
   const formatTimeEnum = (enumValue) => {
    switch (enumValue) {
      case "TIME_1":
        return "09:00~11:00";
      case "TIME_2":
        return "12:00~14:00";
      case "TIME_3":
        return "14:00~16:00";
      case "TIME_4":
        return "16:00~18:00";  
      default:
        return "";
    }
  };

  useEffect(() => {
    const memberCookieValue = getCookie("member");
    const m_num = memberCookieValue ? memberCookieValue.m_num : null;

    const fetchReservations = async () => {
      if (m_num) {
        try {
          const data = await getMyReservations(m_num);
          setReservations(data.dtoList);
        } catch (error) {
          console.error("예약 내역을 불러오는 중 에러가 발생했습니다:", error);
        } finally {
          setFetching(false);
        }
      } else {
        setFetching(false);
      }
    };

    fetchReservations();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      console.log(reservations);
    }, 1000);
  
    return () => clearInterval(interval);
  }, []);

  const handleCancelRequest = async (index) => {
    const r_num = reservations[index].r_num;
    const confirmed = window.confirm("정말로 예약을 취소하시겠습니까?");
    if (confirmed) {
      try {
        await removeRequest(r_num);
        const updatedReservations = [...reservations];
        updatedReservations[index].r_delete_request = true;
        setReservations(updatedReservations);
        alert("예약 취소신청이 되었습니다.");
      } catch (error) {
        console.error("예약 취소 중 에러가 발생했습니다:", error);
        alert("예약 취소에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  const goToLoginPage = () => {
    navigate("/member/mypage"); // Replace '/member/login' with the actual route of the login page
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">내 예약 내역</h2>
      {fetching ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div>
          {reservations.length > 0 ? (
            <div>
              {reservations.map((reservation, index) => (
                <div
                  key={reservation.r_num}
                  className="flex flex-wrap mb-4 border-b border-gray-300"
                >
                  <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-4 py-2">
                    <p className="font-medium">
                      <span className="font-medium">예약 번호:</span>{" "}
                      {reservation.r_num}
                    </p>
                  </div>
                  <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-4 py-2">
                    <p className="font-medium">
                      <span className="font-medium">회원 번호:</span>{" "}
                      {reservation.m_num.m_num}
                    </p>
                  </div>
                  <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-4 py-2">
                    <p className="font-medium">
                      <span className="font-medium">디자이너 이름:</span>{" "}
                      {reservation.d_num.d_name}
                    </p>
                  </div>
                  <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-4 py-2">
                    <p className="font-medium">
                      <span className="font-medium">상품명:</span>{" "}
                      {reservation.allProduct}
                    </p>
                  </div>
                  <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-4 py-2">
                    <p className="font-medium">
                      <span className="font-medium">총 금액:</span>{" "}
                      {reservation.r_total_price}
                    </p>
                  </div>
                  <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-4 py-2">
                    <p className="font-medium">
                      <span className="font-medium">예약 날짜:</span>{" "}
                      {reservation.r_date}
                    </p>
                  </div>
                  <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-4 py-2">
                    <p className="font-medium">
                      <span className="font-medium">예약 시간:</span>{" "}
                      {formatTimeEnum(reservation.a_t_num.time)}
                    </p>
                  </div>
                  <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-4 py-2">
                    <p className="font-medium">
                      <span className="font-medium">애견 종:</span>{" "}
                      {reservation.r_breed}
                    </p>
                  </div>
                  <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-4 py-2">
                    <p className="font-medium">
                      <span className="font-medium">애견 이름:</span>{" "}
                      {reservation.r_dog_name}
                    </p>
                  </div>
                  <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-4 py-2">
                    <p className="font-medium">
                      <span className="font-medium">취소 현황:</span>{" "}
                      {new Date(reservation.r_date) < currentTime ||
                      reservation.r_delete_request ? (
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                          disabled
                        >
                          불가능
                        </button>
                      ) : (
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleCancelRequest(index)}
                        >
                          가능
                        </button>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center">예약 내역이 없습니다.</p>
          )}
        </div>
      )}
      <div className="text-center">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
          onClick={goToLoginPage}
        >
          돌아가기
        </button>
      </div>
    </div>
  );
};

export default MyReservationComponent;
