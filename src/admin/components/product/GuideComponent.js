const GuideComponent = () => {
  return (
    <>
      <div className="p-10 w-full bg-white">
        <h1 class="mb-4 text-center text-6xl font-extrabold leading-none tracking-tight text-gray-900 md:text-6xl lg:text-6xl dark:text-white">
          미용 안내
        </h1>
      </div>

      <div className="p-4 w-full bg-white">
        <h1 className="mb-2 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-3xl dark:text-white">
          <mark className="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">
            예약 시
          </mark>
          &nbsp;유의사항
        </h1>
      </div>

      <div className="w-auto relative flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-base font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400  dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
        <span className="w-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md">
          <p className="mb-1">1. 온라인 예약은 회원가입 후 가능합니다.</p>
          <p className="mb-1 text-orange-600">
            2. 예약 후 예약날짜는 변경할 수 없으며, 취소 후 재예약 하시기
            바랍니다.
          </p>
          <p className="mb-1">
            3. 예약날짜는 최대 30일 후까지 지정할 수 있습니다.
          </p>
          <p className="mb-1">
            4. 결제 방식은 무통장 입금과 카드결제가 가능합니다.
          </p>
          <p className="mb-1">
            5. 예약 당일 자정까지 결제하지 않으면 예약이 자동 취소됩니다.
          </p>
          <p className="mb-1">6. 생리 중인 강아지는 예약 불가합니다.</p>
        </span>
      </div>

      <div className="p-4 w-full mt-12 bg-white">
        <h1 className="mb-2  text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-3xl dark:text-white">
          <mark className="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">
            예약 순서
          </mark>
          &nbsp;안내
        </h1>
      </div>
      <p className="my-1">
        ✅ 로그인 → 예약하기 → 디자이너 선택 → 날짜 및 시간 선택 → 상품 선택 →
        예약 완료
      </p>

      <div className="p-4 w-full mt-12 bg-white">
        <h1 className="mb-2  text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-3xl dark:text-white">
          <mark className="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">
            요금
          </mark>
          &nbsp;안내
        </h1>
      </div>

      <h1 className="my-4 text-lg font-bold">📌 필수 상품</h1>

      <div className="overflow-x-auto">
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
              <th className="bg-gray-100">목욕</th>
              <td>20,000원</td>
              <td>30,000원</td>
              <td>40,000원</td>
              <td>50,000원</td>
            </tr>
            {/* row 2 */}
            <tr>
              <th className="bg-gray-100">위생</th>
              <td>15,000원</td>
              <td>20,000원</td>
              <td>35,000원</td>
              <td>40,000원</td>
            </tr>
            {/* row 3 */}
            <tr>
              <th className="bg-gray-100">목욕+위생</th>
              <td>30,000원</td>
              <td>45,000원</td>
              <td>70,000원</td>
              <td>85,000원</td>
            </tr>
            {/* row 4 */}
            <tr>
              <th className="bg-gray-100">클리핑</th>
              <td>35,000원</td>
              <td>45,000원</td>
              <td>55,000원</td>
              <td>65,000원</td>
            </tr>
            {/* row 5 */}
            <tr>
              <th className="bg-gray-100">가위컷</th>
              <td>75,000원</td>
              <td>90,000원</td>
              <td>110,000원</td>
              <td>130,000원</td>
            </tr>
            {/* row 6 */}
            <tr>
              <th className="bg-gray-100">스포팅</th>
              <td>70,000원</td>
              <td>80,000원</td>
              <td>100,000원</td>
              <td>120,000원</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="my-4">
        <h1 className="mt-8 my-2 text-lg font-bold">✔ 추가 상품</h1>
        <h1 className="text-lg ">+ 얼굴컷 : 5,000원</h1>
        <h1 className="text-lg ">+ 스 &nbsp; 파 : 20,000원</h1>
      </div>

      <div>
        <h1 className="mt-8 my-2 text-lg font-bold">⚠ 추가 비용</h1>
        <h1 className="text-lg ">
          ※ 특수견은 20,000원 추가 됩니다.&nbsp;
          <mark className="text-sm">
            (특수견 : 비숑프리제, 꼬동드뚤레아, 베들링턴, 코카스파니엘,
            웰시코기)
          </mark>
        </h1>
        <h1 className="text-lg ">※ 털엉킴시 20,000원 추가 됩니다.</h1>
        <h1 className="text-lg ">※ 장모는 20,000원 추가 됩니다.</h1>
      </div>

      <div className="p-4 w-full mt-12 bg-white">
        <h1 className="mb-2  text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-3xl dark:text-white">
          <mark className="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">
            환불 관련
          </mark>
          &nbsp;안내
        </h1>
      </div>
      <div className="w-auto relative flex items-center justify-center p-0.5 mb-10 me-2 overflow-hidden text-base font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400  dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
        <span className="w-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md">
          <p className="mb-1">1. 예약 취소는 홈페이지에서 하시길 바랍니다.</p>
          <p className="mb-1 text-orange-600">
            2. 예약 당일 자정까지 결제하지 않으면 예약이 자동 취소됩니다.
          </p>
          <p className="mb-1">
            3. 환불을 원하실 경우 반드시 예약 취소를 해주세요.
          </p>
          <p className="mb-1">
            4. 환불기준에 따라 금액에 차이가 있으니 반드시 확인하시어 차질이
            없으시길 바랍니다.
          </p>
          <p className="mb-1">
            5. 예약 후 예약 날짜와 시간은 변경이 불가하오니 취소 후 재예약을
            해주세요.
          </p>
          <p className="mb-1">
            6. 카드결제건은 카드취소 해드리며, 무통장 환불건은 반드시 본인명의의
            환불계좌번호를 알려주시기 바랍니다.
          </p>
        </span>
      </div>

      <h1 className="my-4 text-lg font-bold">🛑 취소 수수료 안내</h1>

      <div className="flex w-2/3 overflow-x-auto">
        <table className="table text-base text-center">
          {/* head */}
          <thead>
            <tr className="text-base">
              <th className="bg-gray-100">3일전 취소</th>
              <th className="bg-gray-100">2일전 취소</th>
              <th className="bg-gray-100">1일전 취소</th>
              <th className="bg-gray-100">당일 취소</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <td>수수료 없음</td>
              <td>수수료 10,000원</td>
              <td>수수료 20,000원</td>
              <td>수수료 30,000원</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
export default GuideComponent;
