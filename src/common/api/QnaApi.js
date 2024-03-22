import axios from "axios";

export const API_SERVER_HOST = "http://localhost:8080";

const prefix = `${API_SERVER_HOST}/api/qna`;

export const getOne = async (f_num) => {
  const res = await axios.get(`${prefix}/${f_num}`);

  return res.data;
};

export const getList = async (pageParam) => {
  const { page, size } = pageParam;
  const res = await axios.get(`${prefix}/list`, {
    params: { page: page, size: size },
  });

  return res.data;
};

export const postAdd = async (qnaObj) => {
  const res = await axios.post(`${prefix}/`, qnaObj);
  return res.data;
};

export const deleteOne = async (f_num) => {
  const res = await axios.delete(`${prefix}/${f_num}`);
  return res.data;
};

export const putOne = async (qna) => {
  const res = await axios.put(`${prefix}/${qna.f_num}`, qna);
  return res.data;
};
