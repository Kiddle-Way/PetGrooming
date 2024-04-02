import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { getReserveProduct } from "../../../common/api/statisticsApi";

const ProductComponent = () => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const res = await getReserveProduct();
        setProductData(res);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, []);

  // 각 섹션에 대한 색상 생성
  const generateColors = (length) => {
    const colors = ["#0088FE", "#FF8042", "#00C49F", "#FFBB28", "#9966CC"];

    return Array.from({ length }, (_, index) => colors[index % colors.length]);
  };

  const COLORS = generateColors(productData.length);

  // 비율 표시
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="container">
      <h1 className="my-10 font-semibold text-3xl text-center">
        상품별 예약 통계
      </h1>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={productData}
            dataKey={(entry) => entry[1]} // 예약 건수가 value로 설정됩니다.
            nameKey={(entry) => entry[0]} // 상품명이 name으로 설정됩니다.
            cx="50%"
            cy="50%"
            outerRadius={170}
            label={renderCustomizedLabel}
            labelLine={false}
          >
            {productData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            wrapperStyle={{ paddingTop: "30px" }} // Legend 컴포넌트의 위쪽에 여백 추가
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductComponent;
