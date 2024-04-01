import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "./productApi";

const host = `${API_SERVER_HOST}/api/designer`;

export const getOne = async (d_num) => {
  const res = await jwtAxios.get(`${host}/${d_num}`);
  return res.data;
};

export const getList = async ({ page, size }) => {
  try {
    const res = await jwtAxios.get(`${host}/list`, {
      params: { page: page, size: size },
    });
    return res.data;
  } catch (error) {
    console.error("데이터를 불러오는 데 실패했습니다:", error);
    throw error;
  }
};

export const postAdd = async (designer) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  const res = await jwtAxios.post(`${host}/`, designer, header);
  return res.data;
};

//수정 기능
export const putOne = async (d_num, designer) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  const res = await jwtAxios.put(`${host}/${d_num}`, designer, header);
  return res.data;
};

export const updateDesignerState = async (d_num, state) => {
  try {
    const response = await jwtAxios.put(`${host}/${d_num}/${state}`);
    return response.data;
  } catch (error) {
    console.error("Error updating designer state:", error);
    throw error;
  }
};

//화내지마세요
export const search = async (searchGender, searchState, searchKeyword, pageParam) => {
  try {
    const { page, size } = pageParam;
    const url = `${host}/list/search/g${searchGender}/s${searchState}/k${searchKeyword}`;
    const res = await jwtAxios.get(url, {
      params: { page: page, size: size },
    });
    return res.data; // PageResponseDTO<ReviewDTO> 반환
  } catch (error) {
    console.error(error);
    throw error; // 에러 처리
  }
};


