import React, { useState, useEffect } from "react";
import {
  getTotalReserve,
  getYearReserve,
  getMonthlyReserve,
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

const ReserveComponent = () => {
  // 전체 예약 건수
  const [totalReserve, setTotalReserve] = useState(0);

  useEffect(() => {
    getTotalReserve().then((res) => setTotalReserve(res));
  }, []);

  // 연도별 예약 건수
  const [yearlyReserve, setYearlyReserve] = useState([]);

  useEffect(() => {
    const fetchYearlyReserve = async () => {
      try {
        const res = await getYearReserve();
        // 연도별 예약 건수 배열에서 각 내부 배열의 값을 추출하여 설정
        const formattedYearlyReserve = res.map((item) => ({
          year: item[0],
          reserve: item[1],
        }));
        // 연도별 예약 건수를 연도별로 오름차순 정렬
        formattedYearlyReserve.sort((a, b) => a.year - b.year);
        setYearlyReserve(formattedYearlyReserve);
      } catch (error) {
        console.error("연도별 예약 조회 실패:", error);
      }
    };

    fetchYearlyReserve();
  }, []);

  // 월별 예약 건수
  const [monthlyReserve, setMonthlyReserve] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchMonthlyReserve = async () => {
      try {
        const monthlyReserveData = [];
        for (let month = 1; month <= 12; month++) {
          const res = await getMonthlyReserve(selectedYear, month);
          const reserve = res || 0; // 해당 월의 매출이 없으면 0으로 설정
          monthlyReserveData.push({ month: `${month}월`, reserve });
        }
        setMonthlyReserve(monthlyReserveData);
      } catch (error) {
        console.error("월별 예약 조회 실패:", error);
      }
    };

    fetchMonthlyReserve();
  }, [selectedYear]);

  // 이번 년도 예약 건수
  const [thisYearReserve, setThisYearReserve] = useState(0);

  useEffect(() => {
    const fetchThisYearReserve = async () => {
      try {
        const res = await getYearReserve();
        const thisYear = new Date().getFullYear();
        const thisYearData = res.find((item) => item[0] === thisYear);
        const thisYearReserveCount = thisYearData ? thisYearData[1] : 0;
        setThisYearReserve(thisYearReserveCount);
      } catch (error) {
        console.error("이번 년도 예약 조회 실패:", error);
      }
    };

    fetchThisYearReserve();
  }, []);

  // 이번 달 예약 건수
  const [thisMonthReserve, setThisMonthReserve] = useState(0);

  useEffect(() => {
    const fetchThisMonthReserve = async () => {
      try {
        const res = await getMonthlyReserve(
          new Date().getFullYear(),
          new Date().getMonth() + 1
        );
        setThisMonthReserve(res || 0);
      } catch (error) {
        console.error("이번 달 예약 조회 실패:", error);
      }
    };

    fetchThisMonthReserve();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="bg-white py-14 sm:py-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base leading-7 text-gray-600">
                누적 예약 건수
              </dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                {useCountUp(totalReserve)}
              </dd>
            </div>
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base leading-7 text-gray-600">
                이번 년도 예약 건수
              </dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                {useCountUp(thisYearReserve)}
              </dd>
            </div>
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base leading-7 text-gray-600">
                이번 달 예약 건수
              </dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                {useCountUp(thisMonthReserve)}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="mb-20">
        <h3 className="text-2xl font-bold mb-10">연도별 예약 건수</h3>
        <ResponsiveContainer width="100%" height={500} className="mx-auto">
          <BarChart
            data={yearlyReserve}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis type="number" allowDecimals={false} />
            <Tooltip formatter={(value) => [`${value}`, "예약 건수"]} />
            <Bar dataKey="reserve" fill="#82ca9d" barSize={70} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mb-20">
        <h3 className="text-2xl font-bold mb-4">월별 예약 건수</h3>
        <select
          id="yearSelect"
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          className="w-48 p-2 mb-4 border border-gray-300 rounded"
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
            data={monthlyReserve}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis type="number" allowDecimals={false} />
            <Tooltip formatter={(value) => [`${value}`, "예약 건수"]} />
            <Bar dataKey="reserve" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ReserveComponent;
