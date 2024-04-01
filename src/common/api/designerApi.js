import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "./productApi";

// 서버 주소

const host = `${API_SERVER_HOST}/api/designer`;

//특정번호의 조회
export const getOne = async (dno) => {
  const res = await jwtAxios.get(`${host}/${dno}`);

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
    throw error; // 에러를 잡아서 상위 컴포넌트에서 처리할 수 있도록 throw 해줍니다.
  }
};

// 서버 호출 결과
export const postAdd = async (designer) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  // 경로    뒤   '/' 주의
  const res = await jwtAxios.post(`${host}/`, designer, header);

  return res.data;
};

//삭제 호출기능
export const deleteOne = async (dno) => {
  const res = await jwtAxios.delete(`${host}/${dno}`);
  return res.data;
};

//수정 기능
export const putOne = async (dno, designer) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  const res = await jwtAxios.put(`${host}/${dno}`, designer, header);
  return res.data;
};

export const search = async (
  searchGender,
  searchState,
  searchKeyword,
  pageParam
) => {
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

//퇴직,복직
export const updateDesignerState = async (dno, state) => {
  try {
    const response = await jwtAxios.put(`${host}/${dno}/${state}`);
    return response.data;
  } catch (error) {
    console.error("Error updating designer state:", error);
    throw error;
  }
};

