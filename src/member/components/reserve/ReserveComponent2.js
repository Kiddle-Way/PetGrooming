import MenuTable from "./MenuTable";
import SelectMenu from "./SelectMenu";

import "../../../../node_modules/react-calendar/dist/Calendar.css";
import App from "./App";

const ReserveComponent2 = () => {
  return (
    <div className="w-full">
      <div className="w-full flex justify-center">
        <div className="w-2/3">
          <div className="relative mb-4 flex items-center">
            <div className="w-40 p-6 text-right font-bold">이메일</div>
            <input
              className="w-full h-8 p-6 rounded-r border border-solid shadow-md"
              name="email"
              type="email"
            ></input>
          </div>
          <div className="relative mb-4 flex items-center">
            <div className="w-40 p-6 text-right font-bold">이름</div>
            <input
              className="w-full h-8 p-6 rounded-r border border-solid shadow-md"
              name="name"
              type="text"
            ></input>
          </div>
          <div className="relative mb-4 flex items-center">
            <div className="w-40 p-6 text-right font-bold">전화번호</div>
            <input
              className="w-full h-8 p-6 rounded-r border border-solid shadow-md"
              name="number"
              type="text"
            ></input>
          </div>
          <div className="relative mb-4 flex items-center">
            <div className="w-40 p-6 text-right font-bold">견종</div>
            <input
              className="w-full h-8 p-6 rounded-r border border-solid shadow-md"
              name="r_breed"
              type="text"
            ></input>
          </div>
          <div className="relative mb-4 flex items-center">
            <div className="w-40 p-6 text-right font-bold">견이름</div>
            <input
              className="w-full h-8 p-6 rounded-r border border-solid shadow-md"
              name="r_d_name"
              type="text"
            ></input>
          </div>
          <div className="relative mb-4 flex items-center">
            <div className="w-60 p-6 text-right font-bold">특이사항</div>
            <textarea
              className="w-full h-80 p-6 rounded-r border border-solid shadow-md"
              name="text"
              type="text"
            ></textarea>
          </div>
        </div>
        <div className="ml-5 w-full">
          <div className="relative mb-4 flex items-center flex-col">
            <div
              className="w-90 p-6 text-right font-bold mb-4"
              style={{ fontSize: 24 }}
            >
              이용 상품,요금
            </div>
            <MenuTable />
            <div style={{ fontSize: 20 }}>
              가위컷, 스포팅, 클리핑은 목욕+위생 포함된 가격입니다.
              <br /> 특수견 (비숑프리제, 꼬똥드뚤레아, 베들링텅, 코카스파니엘,
              웰시코기)은 예약시 상품가격+20,000원입니다.
              <br /> 추가금사항 : 얼굴컷 15,000원, 스파20,000원, 털엉킴
              20,000원, 장모종 20,000원 <br /> 미용불가사항 : 꽃도장중인 암컷 ,
              입질이 심한경우
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-1/2 ml-48">
          <SelectMenu />
        </div>
        <div className="w-1/2">
          <App />
        </div>
      </div>
    </div>
  );
};

export default ReserveComponent2;
