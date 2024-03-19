import axios from "axios";
import { API_SERVER_HOST } from "./productApi";

// 서버 주소

const host = `${API_SERVER_HOST}/api/designer`;

//특정번호의 조회
export const getOne = async (dno) => {
  const res = await axios.get(`${host}/${dno}`);

  return res.data;
};

//페이지 처리를 위함
export const getList = async (pageParam) => {
  const { page, size } = pageParam;
  const res = await axios.get(`${host}/list`, {
    params: { page: page, size: size },
  });

  return res.data;
};

// 서버 호출 결과
export const postAdd = async (designer) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  // 경로    뒤   '/' 주의
  const res = await axios.post(`${host}/`, designer, header);

  return res.data;
};

//삭제 호출기능
export const deleteOne = async (dno) => {
  const res = await axios.delete(`${host}/${dno}`);
  return res.data;
};

//수정 기능
export const putOne = async (dno, designer) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  const res = await axios.put(`${host}/${dno}`, designer, header);
  return res.data;
};

export const getSearch = async (keyword, pageParam) => {
  const { page, size } = pageParam;
  const res = await axios.get(`${host}/search`, {
    params: { keyword: keyword, page: page, size: size },
  });
  return res.data;
};
