import axios from "axios";
import { API_SERVER_HOST } from "./noticeApi";
const host = `${API_SERVER_HOST}/api/review`;

export const postAdd = async (review) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  // 경로 뒤 '/' 주의
  const res = await axios.post(`${host}/`, review, header);
  return res.data;
};

export const getList = async (pageParam) => {
  const { page, size } = pageParam;
  const res = await axios.get(`${host}/list`, {
    params: { page: page, size: size },
  });
  return res.data;
};

export const getOne = async (v_num) => {
  const res = await axios.get(`${host}/${v_num}`);
  return res.data;
};

export const putOne = async (v_num, review) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  const res = await axios.put(`${host}/${v_num}`, review, header);
  return res.data;
};

export const deleteOne = async (v_num) => {
  const res = await axios.delete(`${host}/${v_num}`);
  return res.data;
};

export const search = async (searchType, searchTerm, pageParam) => {
  try {
    const { page, size } = pageParam;
    const url = `${host}/list/search${searchType}/${searchTerm}`;
    const res = await axios.get(url, {
      params: { page: page, size: size },
    });
    return res.data; // PageResponseDTO<ReviewDTO> 반환
  } catch (error) {
    console.error(error);
    throw error; // 에러 처리
  }
};
