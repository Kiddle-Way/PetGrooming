import MenuTable from "./MenuTable";
import { useState, useEffect } from "react";
import {
  postAdd,
  getEssentialProducts,
  getAdditionalProducts,
  getAvailableTime,
  makeUnavailable,
  getEssentialProductsCategory,
} from "../../../common/api/reserveApi";
import { useLocation, Link } from "react-router-dom";
import Calendar from "react-calendar";
import "../../../../node_modules/react-calendar/dist/Calendar.css";
import Popup from "./Popup";
import { getCookie } from "../../../common/util/cookieUtil";
import Modal from "react-modal";
import Tosspayment from "./Tosspayment";

const ReserveComponent2 = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedInfo = searchParams.get("info");
  const memberCookieValue = getCookie("member");

  const [reserve, setReserve] = useState({
    d_num: { d_num: selectedInfo },
    m_num: { m_num: memberCookieValue.m_num },
    allProduct: "",
    r_date: "",
    a_t_num: { a_t_num: 1 },
    r_total_price: 0,
    r_breed: "",
    r_dog_name: memberCookieValue.dog_name,
    r_dog_notice: memberCookieValue.dog_notice,
  });

  const [a, setA] = useState("");
  const [b, setB] = useState(0);

  const [essentialProductCategories, setEssentialProductCategories] = useState(
    []
  );
  const [selectedCategory, setSelectedCategory] = useState("");

  const [essentialProducts, setEssentialProducts] = useState([]);
  const [additionalProducts, setAdditionalProducts] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // 모달 열기 함수
  const openModal = () => {
    setModalIsOpen(true);
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setModalIsOpen(false);
  };

  // 컴포넌트가 마운트될 때 필수상품 목록과 추가상품 목록을 불러옴
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const categories = await getEssentialProductsCategory();
        setEssentialProductCategories(categories);

        const additionalProducts = await getAdditionalProducts();
        setAdditionalProducts(additionalProducts);
      } catch (error) {
        console.error("Error while fetching products:", error);
      }
    };
    fetchProducts();
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때만 실행

  const handleDateChange = async (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`;

    setReserve({ ...reserve, r_date: formattedDate }); // 선택된 날짜 설정

    try {
      const availableTimes = await getAvailableTime(
        formattedDate,
        reserve.d_num.d_num
      ); // 선택된 날짜에 해당하는 가능한 시간 가져오기
      setAvailableTimes(availableTimes);
    } catch (error) {
      console.error("Error while fetching available time:", error);
    }
  };

  const handleTimeChange = (e) => {
    const { value } = e.target;
    setReserve({ ...reserve, a_t_num: { a_t_num: value } });
  };

  const handleProductChange = (e) => {
    const { value } = e.target;
    console.log(value); // 변경된 값
    const [price, name] = value.split(":");

    // 이전 값과 새 값 사이의 차이를 계산하여 업데이트
    setReserve((prevReserve) => ({
      ...prevReserve,
      allProduct: prevReserve.allProduct.replace(" " + a, "") + ` ${name}`,
    }));

    setReserve((prevReserve) => ({
      ...prevReserve,
      r_total_price: prevReserve.r_total_price - parseInt(b) + parseInt(price),
    }));
    // a 값을 업데이트
    setA(name);
    setB(price);
    console.log(a); // 새로운 값
    console.log(reserve.allProduct); // 변경된 allProduct 확인
  };

  const handleBreedChange = (e) => {
    const { value } = e.target;
    setReserve((Reserve) => ({
      ...Reserve,
      r_breed: value,
    }));
    console.log(reserve.r_breed);
  };

  const handleAdditionalProductChange = (e, product) => {
    const { checked } = e.target;
    if (checked) {
      setReserve((prevReserve) => ({
        ...prevReserve,
        allProduct: prevReserve.allProduct + ` ${product.p_name}`,
        r_total_price: prevReserve.r_total_price + product.p_price,
      }));
    } else {
      // 만약 체크가 해제된 경우 해당 추가 상품 정보를 문자열에서 제거
      const regex = new RegExp(` ${product.p_name}`, "g");
      setReserve((prevReserve) => ({
        ...prevReserve,
        allProduct: prevReserve.allProduct.replace(regex, ""),
        r_total_price: prevReserve.r_total_price - product.p_price,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReserve({ ...reserve, [name]: value });
  };

  const [agreements, setAgreements] = useState({
    1: false,
    2: false,
  });

  // 체크 상태 변경 핸들러
  const handleAgreeChange = (index, isChecked) => {
    setAgreements({ ...agreements, [index]: isChecked });
  };

  // 제출 버튼 활성화 여부 확인 함수
  const isSubmitEnabled = () => {
    return agreements[1] && agreements[2];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 필수 입력 필드에 대한 유효성 검사
    if (
      !reserve.r_date ||
      !reserve.a_t_num.a_t_num ||
      !reserve.r_breed ||
      !reserve.r_dog_name ||
      !reserve.r_dog_notice ||
      !reserve.allProduct
    ) {
      alert("모든 입력 사항을 채워주세요.");
      return;
    }

    if (!isSubmitEnabled()) {
      alert("모든 약관에 동의해주세요.");
      return;
    }

    openModal();
  };

  const handlePaymentSuccess = async () => {
    try {
      console.log(reserve);
      setPaymentSuccess(true);
      await postAdd(reserve);
      const reservedTimeSlot = availableTimes.find(
        (timeSlot) => timeSlot.a_t_num === parseInt(reserve.a_t_num.a_t_num)
      );
      const reservedTime = reservedTimeSlot
        ? `${reservedTimeSlot.time} (${reservedTimeSlot.a_t_date})`
        : "시간 미정";
      await makeUnavailable(reserve.a_t_num.a_t_num); // 예약한 시간을 서버에 전달하여 예약 불가능하게 만듦
      alert(`결재가 성공적으로 되었습니다!\n예약한 시간: ${reservedTime}`);
      window.location.href = "http://localhost:3000/";
    } catch (error) {
      console.error("예약 추가 오류:", error);
      alert("예약 추가 중 오류가 발생했습니다.");
    }
  };

  const mapTimeRange = (time) => {
    switch (time) {
      case "TIME_1":
        return "09:00~11:00";
      case "TIME_2":
        return "12:00~14:00";
      case "TIME_3":
        return "14:00~16:00";
      case "TIME_4":
        return "16:00~18:00";
      default:
        return "";
    }
  };
  const handleCategoryChange = async (e) => {
    const { value } = e.target;
    setSelectedCategory(value);

    try {
      const essentialProducts = await getEssentialProducts(value); // 선택한 카테고리 값을 사용하여 필수 상품 목록 가져오기
      setEssentialProducts(essentialProducts);
    } catch (error) {
      console.error("Error while fetching essential products:", error);
    }
  };

  return (
    <div className="w-full my-16 ">
      <div className="flex justify-end mt-1 mb-4 mr-5">
        홈 ＞ <b>예약하기</b>
      </div>
      <h1 className="mb-14 font-bold text-5xl text-center">예약하기</h1>

      <form onSubmit={handleSubmit}>
        <div className="w-full mx-auto  flex justify-center">
          <div>
            <div className="w-full space-x-28">
              {/* 사용자정보 */}
              <div className="inline-flex relative mb-4 flex-col items-start justify-center">
                <div className="w-72">
                  <label class="label">
                    <span class="text-base font-semibold label-text">
                      이메일
                    </span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={memberCookieValue.m_email}
                    readOnly
                    className="input input-bordered input-warning w-full max-w-lg flex items-center gap-10 mb-5"
                  />
                </div>

                <div className="w-72">
                  <label class="label">
                    <span class="text-base font-semibold label-text">이름</span>
                  </label>
                  <input
                    name="name"
                    type="text"
                    value={memberCookieValue.m_name}
                    readOnly
                    className="input input-bordered input-warning w-full max-w-lg flex items-center gap-10 mb-5"
                  />
                </div>

                <div className="w-72">
                  <label class="label">
                    <span class="text-base font-semibold label-text">
                      전화번호
                    </span>
                  </label>
                  <input
                    name="number"
                    type="text"
                    value={memberCookieValue.m_phone}
                    readOnly
                    className="input input-bordered input-warning w-full max-w-lg flex items-center gap-10 mb-5"
                  />
                </div>

                <div className="w-72">
                  <label class="label">
                    <span class="text-base font-semibold label-text">견종</span>
                  </label>
                  <select
                    value={reserve.r_breed}
                    onChange={handleBreedChange}
                    className="input input-bordered input-warning w-full max-w-lg flex items-center gap-10 mb-5"
                  >
                    <option value="견종 선택">견종 선택 🔽</option>
                    <option value="시베리아허스키">시베리아허스키</option>
                    <option value="푸들">푸들</option>
                    <option value="저먼 셰퍼드">저먼 셰퍼드</option>
                    <option value="알래스칸 맬러뮤트">알래스칸 맬러뮤트</option>
                    <option value="도베르만 핀셔">도베르만 핀셔</option>
                    <option value="골든 리트리버">골든 리트리버</option>
                    <option value="래브라도 레트리버">래브라도 레트리버</option>
                    <option value="베들링턴 테리어">베들링턴 테리어 </option>
                    <option value="이탈리안 그레이 하운드">
                      이탈리안 그레이 하운드
                    </option>
                    <option value="웰시코기">웰시코기</option>
                    <option value="사모예드">사모예드</option>
                    <option value="시바 이누">시바 이누</option>
                    <option value="재페니스 스피츠">재페니스 스피츠</option>
                    <option value="미니어처 슈나우저">미니어처 슈나우저</option>
                    <option value="비숑프리제">비숑프리제</option>
                    <option value="시추">시추</option>
                    <option value="잭 러셀 테리어">잭 러셀 테리어</option>
                    <option value="포메라니안">포메라니안</option>
                    <option value="미니어처 핀셔">미니어처 핀셔</option>
                    <option value="파피용">파피용</option>
                    <option value="요크셔 테리어">요크셔 테리어</option>
                    <option value="말티즈">말티즈</option>
                    <option value="닥스훈트">닥스훈트</option>
                    <option value="치와와">치와와</option>
                    <option value="퍼그">퍼그</option>
                    <option value="프렌치불독">프렌치불독</option>
                    <option value="그 외">그 외</option>
                  </select>
                </div>

                <div className="w-72">
                  <label class="label">
                    <span class="text-base font-semibold label-text">
                      반려견 이름
                    </span>
                  </label>
                  <input
                    name="r_dog_name"
                    type={"text"}
                    value={reserve.r_dog_name}
                    onChange={handleChange}
                    className="input input-bordered input-warning w-full max-w-lg flex items-center gap-10 mb-5"
                  />
                </div>

                <div className="w-72">
                  <label class="label">
                    <span class="text-base font-semibold label-text">
                      특이사항
                    </span>
                  </label>
                  <textarea
                    name="r_dog_notice"
                    value={reserve.r_dog_notice}
                    onChange={handleChange}
                    className="input input-bordered input-warning w-full max-w-lg flex items-center gap-10 mb-5"
                  />
                </div>
              </div>

              {/* 요금 안내 */}
              <div className="inline-flex relative mb-4 items-center flex-col">
                <div className="text-base font-semibold mb-4">요금 안내</div>
                <div className="border">
                  <MenuTable />
                </div>
              </div>
            </div>

            {/* 구분선 */}
            <div className="divider divider-warning"></div>

            {/* 캘린더 */}
            <div className="flex flex-col mt-10">
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-xl font-semibold mb-5">
                  날짜를 선택해주세요
                </h2>
                <Calendar
                  local="ko"
                  value={reserve.r_date ? new Date(reserve.r_date) : new Date()} // 선택된 날짜 표시
                  onChange={handleDateChange}
                  minDate={new Date()}
                  maxDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
                  showOneMonthOnly
                  className="mb-5"
                />

                {/* 시간선택 */}
                <div className="w-1/3">
                  <h2 className="text-xl font-semibold mb-2">
                    시간을 선택해주세요
                  </h2>
                  <select
                    className="select select-warning w-full max-w-xs mb-5"
                    value={reserve.r_time}
                    onChange={handleTimeChange}
                  >
                    <option disabled selected>
                      시간 선택
                    </option>
                    {availableTimes.map((timeSlot) => (
                      <option key={timeSlot.a_t_num} value={timeSlot.a_t_num}>
                        {mapTimeRange(timeSlot.time)} ({timeSlot.a_t_date})
                      </option>
                    ))}
                  </select>

                  {/* 상품선택 */}
                  <h2 className="text-xl font-semibold mb-2">
                    상품을 선택해주세요
                  </h2>
                  <select
                    className="select select-warning w-full max-w-xs mb-5"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                  >
                    <option disabled selected>
                      상품 선택
                    </option>
                    {essentialProductCategories.map((category) => (
                      <option
                        key={category.p_name}
                        value={category.p_name.split(" ")[1]}
                      >
                        {category.p_name.split(" ")[1]}
                      </option>
                    ))}
                  </select>

                  {/* 무게선택 */}
                  <h2 className="text-xl font-semibold mb-2">
                    무게를 선택해주세요
                  </h2>
                  <select
                    className="select select-warning w-full max-w-xs mb-5"
                    value={reserve.product}
                    onChange={handleProductChange}
                  >
                    <option disabled selected>
                      무게 선택
                    </option>
                    {/* 필수상품 목록 출력 */}
                    {essentialProducts.map((product) => (
                      <option
                        key={product.p_num}
                        value={`${product.p_price}:${product.p_name}`}
                      >
                        {product.p_name}
                      </option>
                    ))}
                  </select>

                  {/* 추가상품선택 */}
                  <h2 className="text-xl font-semibold mb-2">
                    추가상품을 선택해주세요
                  </h2>
                  <div className="additional-products">
                    {additionalProducts.map((product) => (
                      <div key={product.p_num}>
                        <label
                          className="flex items-start justify-start font-semibold cursor-pointer label"
                          htmlFor={product.name}
                        >
                          <input
                            type="checkbox"
                            id={product.p_name}
                            value={product.p_price}
                            onChange={(e) =>
                              handleAdditionalProductChange(e, product)
                            }
                            className="checkbox checkbox-warning mr-4"
                          />
                          {product.p_name} +{product.p_price.toLocaleString()}원
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 구분선 */}
            <div className="divider divider-warning"></div>

            <div className="relative mb-4 flex items-center flex-col">
              <Popup onAgree={handleAgreeChange} />
              <div className="action-box">
                <p className="font-semibold text-center text-xl my-10">
                  결제하실 금액 : {reserve.r_total_price.toLocaleString()}원
                  {/* 총 가격 계산 로직을 여기에 작성합니다. */}
                </p>
                <button
                  type="submit"
                  className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
                >
                  결제하기
                </button>

                {/* 모달 */}
                <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={closeModal}
                  contentLabel="Tosspayment Modal"
                >
                  {/* Tosspayment 컴포넌트 표시 */}
                  <Tosspayment
                    reserve={reserve}
                    onPaymentSuccess={handlePaymentSuccess}
                    closeModal={closeModal}
                  />
                </Modal>

                {/* 돌아가기 버튼 */}
                <Link to={{ pathname: "/reserve/page" }}>
                  <button className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500">
                    돌아가기
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReserveComponent2;
