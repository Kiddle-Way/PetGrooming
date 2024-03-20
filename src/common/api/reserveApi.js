import axios from "axios";
export const API_SERVER_HOST = "http://localhost:8080";
const host = `${API_SERVER_HOST}/api/reserve`;

export const postAdd = async (reserve) => {
  const res = await axios.post(`${host}/`, reserve);
  return res.data;
};

export const getEssentialProducts = async () => {
  try {
    const response = await axios.get(
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
    const response = await axios.get(
      `${API_SERVER_HOST}/api/product/additionalproducts`
    );
    return response.data; // 서버에서 받은 데이터를 반환
  } catch (error) {
    console.error("Error while fetching additional products:", error);
    return []; // 에러 발생 시 빈 배열 반환 또는 예외 처리
  }
};

export const getAvailableTime = async (date) => {
  try {
    const response = await axios.get(
      `${API_SERVER_HOST}/api/availabletime/list?date=${date}`
    );
    return response.data; // 서버에서 받은 데이터를 반환
  } catch (error) {
    console.error("Error while fetching available time:", error);
    return []; // 에러 발생 시 빈 배열 반환 또는 예외 처리
  }
};

export const makeUnavailable = async (a_t_num) => {
  try {
    await axios.get(
      `${API_SERVER_HOST}/api/availabletime/makeUnavailable?a_t_num=${a_t_num}`
    );
    console.log("Time slot made unavailable successfully.");
  } catch (error) {
    console.error("Error while making time slot unavailable:", error);
    throw error; // 에러 발생 시 예외를 던집니다.
  }
};
