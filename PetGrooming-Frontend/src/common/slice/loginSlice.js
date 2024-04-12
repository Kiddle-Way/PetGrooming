import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPost } from "../api/memberApi";
import { getCookie, setCookie, removeCookie } from "../util/cookieUtil";

const initState = {
  m_email: "",
  isAdmin: false,
};

const loadMemberCookie = () => {  
  const memberInfo = getCookie("member");
  if (memberInfo && memberInfo.m_name) { 
    memberInfo.nickname = decodeURIComponent(memberInfo.m_name);
  } 
  return { 
    ...memberInfo,
    isAdmin: memberInfo && memberInfo.roleNames && memberInfo.roleNames.includes("ADMIN") 
  };
}

export const loginPostAsync = createAsyncThunk("loginPostAsync", (param) => {
  return loginPost(param);
});

const loginSlice = createSlice({
  name: "LoginSlice",
  initialState: loadMemberCookie() || initState, 
  reducers: {
    login: (state, action) => {
      console.log("로그인.....");
      const data = action.payload;
      return { m_email: data.m_email };
    },
    logout: (state, action) => {
      console.log("로그아웃....");
      removeCookie("member");
      return { ...initState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginPostAsync.fulfilled, (state, action) => {
        console.log("fulfilled : 완료");
        const payload = action.payload;
        if (!payload.error) {
          console.log("쿠키 저장");
          setCookie("member", JSON.stringify(payload), 1); 
          return { ...payload, isAdmin: payload.roleNames && payload.roleNames.includes("ADMIN") }; // isAdmin 설정
        }
        return state; // 에러가 발생한 경우 상태 변경 없음
      })
      .addCase(loginPostAsync.pending, (state, action) => {
        console.log("pending : 처리중");
      })
      .addCase(loginPostAsync.rejected, (state, action) => {
        console.log("rejected : 오류");
        const error = action.error.message;
        if (error === "Unauthorized") {
          alert("이메일과 패스워드를 다시 확인하세요");
        } else {
          alert("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
      });
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
