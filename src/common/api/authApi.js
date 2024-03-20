// auth.js

import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 토큰 저장 및 로드 함수
export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

export const loadToken = () => {
  return localStorage.getItem("token");
};

// 인증된 axios 인스턴스 생성 함수
export const getAuthInstance = () => {
  const token = loadToken();
  if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return instance;
};

// auth.js

// 로그인 함수
export const login = async (email, password) => {
  try {
    const response = await instance.post("/login", { email, password });
    const { token } = response.data;
    saveToken(token); // 토큰 저장
    return response.data;
  } catch (error) {
    throw new Error("로그인에 실패했습니다.");
  }
};

// 로그아웃 함수
export const logout = () => {
  localStorage.removeItem("token"); // 토큰 삭제
};
