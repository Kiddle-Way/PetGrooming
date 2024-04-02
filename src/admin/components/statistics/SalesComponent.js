import React, { useState, useEffect } from "react";
import {
  getTotalSales,
  getYearSales,
  getMonthlySales,
  getWeeklySales,
} from "../../../common/api/statisticsApi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useCountUp from "../../../common/hooks/useCountUp";

const SalesComponents = () => {
  // 전체 매출
  const [totalSales, setTotalSales] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getTotalSales();
        setTotalSales(res);
      } catch (error) {
        console.error("API 호출 실패:", error);
      }
    };

    fetchData();
  }, []);

  // 연도별 총 매출
  const [yearSales, setYearSales] = useState([]);

  useEffect(() => {
    const fetchYearSales = async () => {
      try {
        const res = await getYearSales();
        // 연도별 총 매출 배열에서 각 내부 배열의 값을 추출하여 설정
        const formattedYearSales = res.map((item) => ({
          year: item[0],
          totalSales: item[1],
        }));
        // 연도별 총 매출을 연도별로 오름차순 정렬
        formattedYearSales.sort((a, b) => a.year - b.year);
        setYearSales(formattedYearSales);
      } catch (error) {
        console.error("연도별 총 매출 조회 API 호출 실패:", error);
      }
    };

    fetchYearSales();
  }, []);

  // 월별 매출
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [monthlySales, setMonthlySales] = useState([]);

  useEffect(() => {
    const fetchMonthlySales = async () => {
      try {
        const monthlySalesData = [];
        for (let month = 1; month <= 12; month++) {
          const res = await getMonthlySales(selectedYear, month);
          const sales = res || 0; // 해당 월의 매출이 없으면 0으로 설정
          monthlySalesData.push({ month: `${month}월`, sales });
        }
        setMonthlySales(monthlySalesData);
      } catch (error) {
        console.error("월별 매출 조회 API 호출 실패:", error);
      }
    };

    fetchMonthlySales();
  }, [selectedYear]);

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value));
  };

  // 주간별 매출
  const [weeklySales, setWeeklySales] = useState([]);

  useEffect(() => {
    const fetchWeeklySales = async () => {
      try {
        const weeklySalesData = [];
        for (let week = 1; week <= 52; week++) {
          const res = await getWeeklySales(selectedYear, week);
          const sales = res || 0; // 해당 주의 매출이 없으면 0으로 설정
          weeklySalesData.push({ week: `${week}주`, sales });
        }
        setWeeklySales(weeklySalesData);
      } catch (error) {
        console.error("주간별 매출 조회 API 호출 실패:", error);
      }
    };

    fetchWeeklySales();
  }, [selectedYear]);

  // 전체 매출에 대한 useCountUp 훅을 사용하여 증가하는 값을 가져옵니다.
  const animatedSales = useCountUp(totalSales);

  // 현재 월의 매출을 가져옵니다.
  const selectedMonthSales = monthlySales.find(
    (month) => month.month === `${new Date().getMonth() + 1}월`
  )?.sales;

  // 현재 월의 매출에 대한 useCountUp 훅을 사용하여 증가하는 값을 가져옵니다.
  const animatedMonthlySales = useCountUp(selectedMonthSales);

  // 현재 연도의 매출을 가져옵니다.
  const selectedYearSales = yearSales.find(
    (item) => item.year === new Date().getFullYear()
  )?.totalSales;

  // 현재 연도의 매출에 대한 useCountUp 훅을 사용하여 증가하는 값을 가져옵니다.
  const animatedYearSales = useCountUp(selectedYearSales);

  return (
    <div className="container mx-auto">
      <div className="mb-20">
        <div className="bg-white py-14 sm:py-14">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
              <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-base leading-7 text-gray-600">누적 매출</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                  {animatedSales !== null
                    ? animatedSales.toLocaleString()
                    : "0"}
                  원
                </dd>
              </div>
              <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-base leading-7 text-gray-600">
                  이번 년도 매출
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                  {typeof animatedYearSales === "number" &&
                  !isNaN(animatedYearSales)
                    ? animatedYearSales.toLocaleString()
                    : "0"}
                  원
                </dd>
              </div>
              <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-base leading-7 text-gray-600">
                  이번 달 매출
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                  {typeof animatedMonthlySales === "number" &&
                  !isNaN(animatedMonthlySales)
                    ? animatedMonthlySales.toLocaleString()
                    : "0"}
                  원
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-10">연도별 매출 조회</h2>
        <ResponsiveContainer width="100%" height={400} className="mx-auto">
          <BarChart
            data={yearSales}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis tickFormatter={(value) => `${value.toLocaleString()}원`} />
            <Tooltip formatter={(value) => [`${value}원`, "매출"]} />
            <Bar dataKey="totalSales" fill="#82ca9d" barSize={70} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mb-20">
        <h2 className="text-2xl font-bold mb-4">월별 매출 조회</h2>
        <select
          className="w-48 p-2 mb-10 border border-gray-300 rounded"
          value={selectedYear}
          onChange={handleYearChange}
        >
          {Array.from({ length: 10 }, (_, i) => {
            const year = new Date().getFullYear() - i;
            return (
              <option key={year} value={year}>
                {year}년
              </option>
            );
          })}
        </select>
        <ResponsiveContainer width="100%" height={500} className="mx-auto">
          <BarChart
            data={monthlySales}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => `${value.toLocaleString()}원`} />
            <Tooltip formatter={(value) => [`${value}원`, "매출"]} />
            <Bar dataKey="sales" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mb-20">
        <h2 className="text-2xl font-bold mb-4">주간 매출 조회</h2>
        <ResponsiveContainer width="100%" height={400} className="mx-auto">
          <BarChart
            data={weeklySales}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis tickFormatter={(value) => `${value.toLocaleString()}원`} />
            <Tooltip formatter={(value) => [`${value}원`, "매출"]} />
            <Bar dataKey="sales" stroke="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesComponents;
