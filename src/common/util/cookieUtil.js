import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (m_name, value, days) => {
  const expires = new Date();
  expires.setUTCDate(expires.getUTCDate() + days); //보관기한
  return cookies.set(m_name, value, { path: "/", expires: expires });
};

export const getCookie = (m_name) => {
  return cookies.get(m_name);
};

export const removeCookie = (m_name, path = "/") => {
  cookies.remove(m_name, { path });
};
