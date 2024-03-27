import axios from "axios";

//서버 주소
export const API_SERVER_HOST = "http://localhost:8080";

const prefix = `${API_SERVER_HOST}/api/member`;

export const postAdd = async (member) => {
  const res = await axios.post(`${prefix}/`, member);
  return res.data;
};

export const getOne = async (m_num) => {
  const res = await axios.get(`${prefix}/${m_num}`);
  return res.data;
};

export const putOne = async (member) => {
  const res = await axios.put(`${prefix}/${member.m_num}`, member);
  return res.data;
}

export const login = async (m_email, m_pw) => {
  try {
    const res = await axios.post(
      `${prefix}/login2`,
      { m_email, m_pw }
    );
    return res.data;
  } catch (error) {
    throw new Error("로그인에 실패했습니다."); 
  }
};

