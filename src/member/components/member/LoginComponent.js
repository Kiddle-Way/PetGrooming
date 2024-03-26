import { useState } from "react";
import useCustomLogin from "../../../common/hooks/useCustomLogin";

const initState = {
  email: "",
  pw: "",
};

const LoginComponent = () => {
  const [loginParam, setLoginParam] = useState({ ...initState });

  const { doLogin, moveToPath } = useCustomLogin();

  const handleChange = (e) => {
    loginParam[e.target.name] = e.target.value;
    setLoginParam({ ...loginParam });
  };
  const handleClickLogin = (e) => {
    doLogin(loginParam) // loginSlice의 비동기 호출
      .then((data) => {
        console.log(data);

        if (data.error) {
          alert("이메일과 패스워드를 다시 확인하세요");
        } else {
          alert("로그인 성공");
          moveToPath("/");
        }
      });
  };

  return (
    <div className="relative flex flex-col justify-center my-10 w-full p-6 m-auto bg-white rounded-lg shadow-xl lg:max-w-lg">
      <div className="text-3xl my-10 font-semibold text-center text-amber-500">
        펫 구루밍 로그인
      </div>
      <div className="relative mb-4 flex w-full flex-wrap items-stretch space-y-4">
        <div className="text-base label-text">아이디</div>
        <input
          className="w-full input input-bordered input-warning"
          name="email"
          type={"text"}
          value={loginParam.email}
          onChange={handleChange}
        ></input>
      </div>
      <div className="relative mb-4 flex w-full flex-wrap items-stretch space-y-4">
        <div className="text-base label-text">비밀번호</div>
        <input
          className="w-full input input-bordered input-warning"
          name="pw"
          type={"password"}
          value={loginParam.pw}
          onChange={handleChange}
        ></input>
      </div>
      <div className="flex mx-auto font-bold">
        <button
          className="text-gray-100 btn btn-success mt-3"
          onClick={handleClickLogin}
        >
          LOGIN
        </button>
      </div>
    </div>
  );
};

export default LoginComponent;
