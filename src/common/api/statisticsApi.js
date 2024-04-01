import jwtAxios from "../util/jwtUtil";

// 서버 주소
export const API_SERVER_HOST = "http://localhost:8080";

const prefix = `${API_SERVER_HOST}/api/statistics`;

export const getTotalSales = async () => {
  const res = await jwtAxios.get(`${prefix}/totalSales`);
  return res.data;
};

export const getYearSales = async () => {
  const res = await jwtAxios.get(`${prefix}/yearSales`);
  return res.data;
};

export const getMonthlySales = async (year, month) => {
  const res = await jwtAxios.get(
    `${prefix}/monthlySales?year=${year}&month=${month}`
  );
  return res.data;
};

export const getWeeklySales = async (year, week) => {
  const res = await jwtAxios.get(
    `${prefix}/weeklySales?year=${year}&week=${week}`
  );
  return res.data;
};

export const getTotalReserve = async () => {
  const res = await jwtAxios.get(`${prefix}/totalReserve`);
  return res.data;
};

export const getYearReserve = async () => {
  const res = await jwtAxios.get(`${prefix}/yearReserve`);
  return res.data;
};

export const getMonthlyReserve = async (year, month) => {
  const res = await jwtAxios.get(
    `${prefix}/monthlyReserve?year=${year}&month=${month}`
  );
  return res.data;
};

export const getReserveProduct = async () => {
  const res = await jwtAxios.get(`${prefix}/reserveProduct`);
  return res.data;
};

export const getReserveBreed = async () => {
  const res = await jwtAxios.get(`${prefix}/reserveBreed`);
  console.log(res.data);
  return res.data;
};
