import axios from "axios";

//서버   주소
export const API_SERVER_HOST = "http://localhost:8080";
const prefix = `${API_SERVER_HOST}/api/notice`;

export const getOne = async (tno) => {     //특정번호 게시물조회
  const res = await axios.get(`${prefix}/${tno}`);
  return res.data;
};

export const getList = async (pageParam) => {   // 페이지 처리를 위한 사용
  const { page, size } = pageParam;
  const res = await axios.get(`${prefix}/list`, {
    params: { page: page, size: size },
  });

  return res.data;
};
