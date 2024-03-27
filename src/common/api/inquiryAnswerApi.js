import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "./noticeApi";

const host = `${API_SERVER_HOST}/api/inquiry`;

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
