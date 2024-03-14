import axios from "axios";
//서버 주소
export const API_SERVER_HOST = "http://localhost:8080";

const prefix = `${API_SERVER_HOST}/api/product`;

export const getOne = async (p_num) => {
  const res = await axios.get(`${prefix}/${p_num}`);
  return res.data;
};

export const getList = async (pageParam) => {
  const { page, size } = pageParam;
  const res = await axios.get(`${prefix}/list`, {
    params: { page: page, size: size },
  });
  return res.data;
};

export const postAdd = async (productObj) => {
  const res = await axios.post(`${prefix}/`, productObj);
  return res.data;
};

export const deleteOne = async (p_num) => {
  const res = await axios.delete(`${prefix}/${p_num}`);
  return res.data;
};

export const putOne = async (product) => {
  const res = await axios.put(`${prefix}/${product.p_num}`, product);
  return res.data;
};

export const getSearch = async (keyword, pageParam) => {
  const { page, size } = pageParam;
  const res = await axios.get(`${prefix}/search`, {
    params: { keyword: keyword, page: page, size: size },
  });
  return res.data;
};

export const sortPrice = async (pageParam) => {
  const { page, size } = pageParam;
  const res = await axios.get(`${prefix}/sortPrice`, {
    params: { page: page, size: size },
  });
  return res.data;
};

export const sortP_num = async (pageParam) => {
  const { page, size } = pageParam;
  const res = await axios.get(`${prefix}/sortP_num`, {
    params: { page: page, size: size },
  });
  return res.data;
};
