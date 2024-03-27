import React, { useState } from "react";
import { login } from "../../../common/api/memberApi";
import "./LoginComponent.css"; // 스타일 파일 추가
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // 입력값이 변경될 때마다 에러를 초기화
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "이메일을 입력하세요.";
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "비밀번호를 입력하세요.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    try {
      const response = await login(formData.email, formData.password);
      console.log("로그인 성공:", response);
      // 로그인 성공 후 다음 페이지로 이동 등의 처리
      navigate(`/mypage/${response.m_num}`); // 로그인 후 마이페이지로 이동
    } catch (error) {
      console.error("로그인 실패:", error);
      setErrors({ ...errors, email: "이메일 또는 비밀번호가 올바르지 않습니다." });
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        {errors.email && <div className="error">{errors.email}</div>}
      </div>
      <div>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        {errors.password && <div className="error">{errors.password}</div>}
      </div>
      <button type="submit" className="login-button">로그인</button>
    </form>
  );
};

export default LoginComponent;
