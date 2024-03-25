import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "./noticeApi";

const host = `${API_SERVER_HOST}/api/review`;

export const getList = async (pageParam) => {
  const { page, size } = pageParam;

  const res = await jwtAxios.get(`${host}/list`, {
    params: { page: page, size: size },
  });
  return res.data;
};

export const getOne = async (v_num) => {
  const res = await jwtAxios.get(`${host}/${v_num}`);
  return res.data;
};

export const putOne = async (v_num, review) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  const res = await jwtAxios.put(`${host}/${v_num}`, review, header);
  return res.data;
};
