const GuideComponent = () => {
  return (
    <>
      <div className="p-10 w-full bg-white">
        <h1 class="mb-4 text-center text-6xl font-extrabold leading-none tracking-tight text-gray-900 md:text-6xl lg:text-6xl dark:text-white">
          종합안내
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
          <p className="mb-1 text-pink-500">
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
          <p className="mb-1">6.</p>
        </span>
      </div>

      <div className="alert alert-danger">
        <h4 className="alert-title">예약 시 유의 사항</h4>
        <ul>
          <li>예약 취소 시 취소자는 2시간 동안 예약을 할 수 없습니다.</li>
          <li>
            임의로 가예약을 잡은 후 취소, 일정 변경 후 즉시 재예약을 함으로써
            다른 사용자에게 피해를 주는 행위를 방지하기 위한 조치입니다.
          </li>
          <li>
            예약 후 예약 일자 및 시설은 변경할 수 없으며, 취소 후 재예약 하시기
            바랍니다.
          </li>
          <li>
            많은 사람들이 사용하는 만큼 신중히 신청하셔서 다른 사용자에게 피해를
            주는 일이 없도록 해주세요.
          </li>
        </ul>
      </div>

      <div className="alert alert-info">
        <h4 class="alert-title">예약 전 안내</h4>
        <ul>
          <li>온라인 예약은 회원가입 후 가능합니다.</li>
          <li>결제 방식은 무통장 입금과 카드 결제가 가능합니다.</li>
          <li>
            무통장 입금 시 예약하신 분 이름과 불일치할 경우 꼭 전화를 통해
            알려주시기 바랍니다. (미연락 시 예약 취소 등 불이익이 있을 수
            있습니다.)
          </li>
          <li>
            예약 당일 자정까지 결제(무통장 입금, 카드 결제)하지 않으면 예약이
            자동 취소됩니다.
          </li>
          <li>
            예약 일자 및 시설은 변경하실 수 없으며, 취소 후 재예약이 하시기
            바랍니다.
          </li>
          <li>입금 계좌: 농협 301-0101-2440-81</li>
          <li>예금주: 동해시시설관리공단(망상오토캠핑리조트)</li>
        </ul>
      </div>
    </>
  );
};
export default GuideComponent;
