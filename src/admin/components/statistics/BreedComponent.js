import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { getReserveBreed } from "../../../common/api/statisticsApi";

const BreedComponent = () => {
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    getReserveBreed().then((res) => {
      setBreeds(res);
    });
  }, []);

  // 각 섹션에 대한 색상 생성
  const generateFixedColors = () => {
    const colors = [
      "#0088FE", //(파란색)
      "#FF8042", //(주황색)
      "#00C49F", //(청록색)
      "#FFBB28", //(노란색)
      "#9966CC", //(보라색)
      "#FF8C00", //(주황색)
      "#66CDAA", //(청록색)
      "#FFD700", //(금색)
      "#9370DB", //(보라색)
      "#20B2AA", //(청록색)
      "#994499", // 자주색
      "#22AA99", // 시안
      "#AAAA11", // 황토색
      "#6633CC", // 감청색
      "#E67300", // 담황색
      "#8B0707", // 갈색
      "#329262", // 초록
      "#5574A6", // 짙은 회색
      "#3B3EAC", // 짙은 파랑
      "#B77322", // 짙은 황토색
      // 여기에 필요한 만큼 계속 추가합니다.
    ];

    // colors 배열을 3회 반복하여 40가지의 색상을 생성합니다.
    return Array.from(
      { length: 40 },
      (_, index) => colors[index % colors.length]
    );
  };

  const colors = generateFixedColors();
  console.log(colors.length); // 40

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
        견종별 예약 통계
      </h1>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={breeds}
            dataKey={(entry) => entry[1]} // 예약 건수가 value로 설정됩니다.
            nameKey={(entry) => entry[0]} // 견종이 name으로 설정됩니다.
            cx="50%"
            cy="50%"
            outerRadius={170}
            labelLine={false}
            label={renderCustomizedLabel}
          >
            {breeds.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={generateFixedColors(breeds.length)[index]}
              />
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

export default BreedComponent;
