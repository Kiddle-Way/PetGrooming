import jwtAxios from "../util/jwtUtil"
import { API_SERVER_HOST } from "./noticeApi";
const host = `${API_SERVER_HOST}/api/inquiry`;

export const postAdd = async (inquiry) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  // 경로 뒤 '/' 주의
  const res = await jwtAxios.post(`${host}/`, inquiry, header);
  return res.data;
};

export const getList = async (pageParam) => {
  const { page, size } = pageParam;
  const res = await jwtAxios.get(`${host}/list`, {
    params: { page: page, size: size },
  });
  return res.data;
};

export const getOne = async (i_num) => {
  const res = await jwtAxios.get(`${host}/${i_num}`);
  return res.data;
};

export const putOne = async (i_num, inquiry) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  const res = await jwtAxios.put(`${host}/${i_num}`, inquiry, header);
  return res.data;
};

export const deleteOne = async (i_num) => {
  const res = await jwtAxios.delete(`${host}/${i_num}`);
  return res.data;
};

export const search = async (searchType, searchTerm, pageParam) => {
  try {
    const { page, size } = pageParam;
    const url = `${host}/list/search${searchType}/${searchTerm}`;
    const res = await jwtAxios.get(url, {
      params: { page: page, size: size },
    });
    return res.data; // PageResponseDTO<ReviewDTO> 반환
  } catch (error) {
    console.error(error);
    throw error; // 에러 처리
  }
};
