import axios from "axios";
import { API_SERVER_HOST } from "../../common/api/noticeApi";

const host = `${API_SERVER_HOST}/api/member`;

export const postAdd = async (member) => {
  const res = await axios.post(`${host}/`, member);
  return res.data;
};

export const getOne = async (m_num) => {
  const res = await axios.get(`${host}/${m_num}`);
  return res.data;
};

export const putOne = async (member) => {
  const res = await axios.put(`${host}/${member.m_num}`, member);
  return res.data;
};

export const loginPost = async (loginParam) => {
  const header = { headers: { "Content-Type": "x-www-form-urlencoded" } };

  const form = new FormData();
  form.append("username", loginParam.email);
  form.append("password", loginParam.pw);

  const res = await axios.post(`${host}/login`, form, header);

  return res.data;
};
