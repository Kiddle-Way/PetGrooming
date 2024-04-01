import jwtAxios from "../util/jwtUtil";

export const API_SERVER_HOST = "http://localhost:8080";
const host = `${API_SERVER_HOST}/api/reserve`;

export const postAdd = async (reserve) => {
  const res = await jwtAxios.post(`${host}/`, reserve);
  return res.data;
};

export const getEssentialProducts = async () => {
  try {
    const response = await jwtAxios.get(
      `${API_SERVER_HOST}/api/product/essentialproducts`
    );
    return response.data; // 서버에서 받은 데이터를 반환
  } catch (error) {
    console.error("Error while fetching essential products:", error);
    return []; // 에러 발생 시 빈 배열 반환 또는 예외 처리
  }
};

// 추가상품 목록을 불러오는 함수
export const getAdditionalProducts = async () => {
  try {
    const response = await jwtAxios.get(
      `${API_SERVER_HOST}/api/product/additionalproducts`
    );
    return response.data; // 서버에서 받은 데이터를 반환
  } catch (error) {
    console.error("Error while fetching additional products:", error);
    return []; // 에러 발생 시 빈 배열 반환 또는 예외 처리
  }
};

export const getAvailableTime = async (date, d_num) => {
  // d_num 매개변수 추가
  try {
    const response = await jwtAxios.get(
      `${API_SERVER_HOST}/api/availabletime/list?date=${date}&d_num=${d_num}` // d_num 추가
    );
    return response.data; // 서버에서 받은 데이터를 반환
  } catch (error) {
    console.error("Error while fetching available time:", error);
    return []; // 에러 발생 시 빈 배열 반환 또는 예외 처리
  }
};

export const makeUnavailable = async (a_t_num) => {
  try {
    await jwtAxios.get(
      `${API_SERVER_HOST}/api/availabletime/makeUnavailable?a_t_num=${a_t_num}`
    );
    console.log("Time slot made unavailable successfully.");
  } catch (error) {
    console.error("Error while making time slot unavailable:", error);
    throw error; // 에러 발생 시 예외를 던집니다.
  }
};

// 내 정보에서 예약내역 확인
export const getMyReservations = async (m_num) => {
  try {
    const response = await jwtAxios.get(
      `${host}/my-reservations?m_num=${m_num}`
    );
    return response.data; // 서버에서 받은 데이터를 반환
  } catch (error) {
    console.error("Error while fetching my reservations:", error);
    throw error; // 에러 발생 시 예외를 던집니다.
  }
};

// 내 예약 취소 신청
export const removeRequest = async (r_num) => {
  try {
    const response = await jwtAxios.delete(`${host}/request/${r_num}`);
    return response.data; // 서버에서 받은 데이터를 반환
  } catch (error) {
    console.error("Error while cancelling reservation:", error);
    throw error; // 에러 발생 시 예외를 던집니다.
  }
};

export const getReserveList = async (pageParam) => {
  const { page, size } = pageParam;
  const res = await jwtAxios.get(`${host}/list`, {
    params: { page: page, size: size },
  });
  return res.data;
};

// 예약 내역 전체 리스트
export const getAllReserveList = async (pageParam) => {
  const { page, size } = pageParam;
  const res = await jwtAxios.get(`${host}/allList`, {
    params: { page: page, size: size },
  });
  return res.data;
};

// 지난 예약 내역 리스트
export const getPastReserveList = async (pageParam) => {
  const { page, size } = pageParam;
  const res = await jwtAxios.get(`${host}/pastList`, {
    params: { page: page, size: size },
  });
  return res.data;
};

// 취소 확정
export const changeDflag = async (r_num) => {
  try {
    const response = await jwtAxios.delete(`${host}/${r_num}`);
    return response.data; // 서버에서 받은 데이터를 반환
  } catch (error) {
    console.error("Error while cancelling reservation:", error);
    throw error; // 에러 발생 시 예외를 던집니다.
  }
};

// 예약 시간 복구
export const changeMakeAvailable = async (a_t_num) => {
  try {
    await jwtAxios.get(
      `${API_SERVER_HOST}/api/availabletime/makeAvailable?a_t_num=${a_t_num}`
    );
    console.log("Time slot made unavailable successfully.");
  } catch (error) {
    console.error("Error while making time slot unavailable:", error);
    throw error; // 에러 발생 시 예외를 던집니다.
  }
};
