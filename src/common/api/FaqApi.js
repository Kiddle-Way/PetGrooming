import jwtAxios from "../util/jwtUtil";

export const API_SERVER_HOST = "http://localhost:8080";

const prefix = `${API_SERVER_HOST}/api/faq`;

export const getOne = async (f_num) => {
  const res = await jwtAxios.get(`${prefix}/${f_num}`);

  return res.data;
};

export const getList = async (pageParam) => {
  const { page, size } = pageParam;
  const res = await jwtAxios.get(`${prefix}/list`, {
    params: { page: page, size: size },
  });

  return res.data;
};

export const postAdd = async (faqObj) => {
  const res = await jwtAxios.post(`${prefix}/`, faqObj);
  return res.data;
};

export const deleteOne = async (f_num) => {
  const res = await jwtAxios.delete(`${prefix}/${f_num}`);
  return res.data;
};

export const putOne = async (faq) => {
  const res = await jwtAxios.put(`${prefix}/${faq.f_num}`, faq);
  return res.data;
};

export const search = async (searchType, searchTerm, pageParam) => {
  try {
    const { page, size } = pageParam;
    const url = `${prefix}/list/search${searchType}/${searchTerm}`;
    const res = await jwtAxios.get(url, {
      params: { page: page, size: size },
    });
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
