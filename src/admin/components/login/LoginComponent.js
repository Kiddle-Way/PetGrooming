import { useState, useCallback } from "react";
import useCustomMove from "../../../common/hooks/useCustomMove";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "admin" && password === "admin1234") {
      // 인증 성공 시 상품 목록 페이지로 이동
      navigate({ pathname: "/product/list" });
    } else {
      setError("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className="relative flex flex-col justify-center h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg">
        <h1 className="text-3xl  my-10 font-semibold text-center text-purple-700">
          PetGrooming 관리자 로그인
        </h1>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="label">
              <span className="text-base label-text">아이디</span>
            </label>
            <input
              type="text"
              placeholder="관리자 아이디를 입력하세요."
              className="w-full input input-bordered input-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">비밀번호</span>
            </label>
            <input
              type="password"
              placeholder="관리자 비밀번호를 입력하세요."
              className="w-full input input-bordered input-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <div className="text-red-600">{error}</div>}
          <div>
            <button type="submit" className="btn btn-primary mt-10">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
