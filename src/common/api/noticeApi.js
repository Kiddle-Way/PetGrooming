import jwtAxios from "../util/jwtUtil";
export const API_SERVER_HOST = "http://localhost:8080";

const prefix = `${API_SERVER_HOST}/api/notice`;

export const getOne = async (n_num) => {
  const res = await jwtAxios.get(`${prefix}/${n_num}`);

  return res.data;
};

export const getList = async (pageParam) => {
  const { page, size } = pageParam;
  const res = await jwtAxios.get(`${prefix}/list`, {
    params: { page: page, size: size },
  });

  return res.data;
};

export const postAdd = async (notice) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };

  const res = await jwtAxios.post(`${prefix}/`, notice, header);

  return res.data;
};

export const deleteOne = async (n_num) => {
  const res = await jwtAxios.delete(`${prefix}/${n_num}`);
  return res.data;
};

export const putOne = async (n_num, notice) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };
  const res = await jwtAxios.put(`${prefix}/${n_num}`, notice, header);
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
