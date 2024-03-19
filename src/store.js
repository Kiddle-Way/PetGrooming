import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./common/slice/loginSlice";


export default configureStore({
  reducer: {
    loginSlice: loginSlice,
  },
});
