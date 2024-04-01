import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPost } from "../api/memberApi";
import { getCookie, setCookie, removeCookie } from "../util/cookieUtil";

const initState = {
  m_email: "",
  isAdmin: false,
};

const loadMemberCookie = () => {  
  const memberInfo =  getCookie("member");
  if(memberInfo && memberInfo.m_name) { 
    memberInfo.nickname = decodeURIComponent(memberInfo.m_name);
  } 
  return memberInfo;
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
        }
        return { ...payload, isAdmin: payload.roleNames.includes("ADMIN") }; // isAdmin 설정
      })
      .addCase(loginPostAsync.pending, (state, action) => {
        console.log("pending : 처리중");
      })
      .addCase(loginPostAsync.rejected, (state, action) => {
        console.log("rejected : 오류");
      });
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
