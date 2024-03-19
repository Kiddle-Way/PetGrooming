import React, { useState } from "react";
import Calendar from "react-calendar";
import "../../../../node_modules/react-calendar/dist/Calendar.css";

const SelectMenu = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [facialChecked, setFacialChecked] = useState(false);
  const [spaChecked, setSpaChecked] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value);
  };

  const handleFacialChange = (event) => {
    setFacialChecked(event.target.checked);
  };

  const handleSpaChange = (event) => {
    setSpaChecked(event.target.checked);
  };

  return (
    <div>
      <h2 style={{ fontSize: 24 }}>예약</h2>
      <Calendar
        local="ko"
        onChange={handleDateChange}
        value={selectedDate}
        minDate={new Date()} // 현재 날짜 이후만 선택 가능
        maxDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)} // 현재 날짜부터 30일 후까지만 선택 가능
        showOneMonthOnly
      />
      <select value={selectedTime} onChange={handleTimeChange}>
        <option value="">시간 선택</option>
        <option value="TIME_1">TIME_1</option>
        <option value="TIME_2">TIME_2</option>
        <option value="TIME_3">TIME_3</option>
        <option value="TIME_4">TIME_4</option>
      </select>
      <select value={selectedProduct} onChange={handleProductChange}>
        <option value="">상품 선택</option>
        <option value="목욕">목욕</option>
        <option value="커트">커트</option>
        <option value="스파">스파</option>
      </select>
      <div className="additional-products">
        <input
          type="checkbox"
          id="facial"
          checked={facialChecked}
          onChange={handleFacialChange}
        />
        <label for="facial">얼굴컷 +5,000</label>
        <br />
        <input
          type="checkbox"
          id="spa"
          checked={spaChecked}
          onChange={handleSpaChange}
        />
        <label for="spa">스파+20,000</label>
      </div>
    </div>
  );
};

export default SelectMenu;
