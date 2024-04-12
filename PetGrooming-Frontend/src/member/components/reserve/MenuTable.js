import React from "react";

const MenuTable = () => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="table text-base text-center">
        {/* head */}
        <thead>
          <tr className="text-base">
            <th></th>
            <th className="bg-gray-100">~ 4kg</th>
            <th className="bg-gray-100">5 ~ 8 kg</th>
            <th className="bg-gray-100">9 ~ 12kg</th>
            <th className="bg-gray-100">13 ~ 15kg</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr>
            <th className="bg-gray-100">위생</th>
            <td>15,000원</td>
            <td>25,000원</td>
            <td>35,000원</td>
            <td>45,000원</td>
          </tr>
          {/* row 2 */}
          <tr>
            <th className="bg-gray-100">목욕</th>
            <td>25,000원</td>
            <td>35,000원</td>
            <td>45,000원</td>
            <td>55,000원</td>
          </tr>
          {/* row 3 */}
          <tr>
            <th className="bg-gray-100">목욕+위생</th>
            <td>35,000원</td>
            <td>50,000원</td>
            <td>65,000원</td>
            <td>80,000원</td>
          </tr>
          {/* row 4 */}
          <tr>
            <th className="bg-gray-100">클리핑</th>
            <td>45,000원</td>
            <td>60,000원</td>
            <td>75,000원</td>
            <td>90,000원</td>
          </tr>
          {/* row 5 */}
          <tr>
            <th className="bg-gray-100">스포팅</th>
            <td>70,000원</td>
            <td>80,000원</td>
            <td>100,000원</td>
            <td>120,000원</td>
          </tr>
          {/* row 6 */}
          <tr>
            <th className="bg-gray-100">가위컷</th>
            <td>80,000원</td>
            <td>90,000원</td>
            <td>110,000원</td>
            <td>130,000원</td>
          </tr>
        </tbody>
      </table>

      <div className="my-4">
        <h1 className="mt-8 my-2 text-base font-bold">✔ 안내 사항</h1>
        <h1 className="text-base">
          ※ 가위컷, 스포팅, 클리핑은 목욕+위생이 포함된 가격입니다.
        </h1>
        <h1 className="text-base">
          ※ 꽃도장 중인 암컷 , 입질이 심한경우 미용이 불가합니다.
        </h1>
      </div>

      <div>
        <h1 className="mt-8 my-2 text-base font-bold">⚠ 추가 비용</h1>
        <h1 className="text-base">
          ※ 특수견은 20,000원 추가 됩니다.&nbsp;
          <div>
            <mark className="text-sm">
              (특수견 : 비숑프리제, 꼬동드뚤레아, 베들링턴, 코카스파니엘,
              웰시코기)
            </mark>
          </div>
        </h1>
        <h1 className="text-base ">※ 털엉킴시 20,000원 추가 됩니다.</h1>
        <h1 className="text-base ">※ 장모종은 20,000원 추가 됩니다.</h1>
      </div>
    </div>
  );
};

export default MenuTable;
