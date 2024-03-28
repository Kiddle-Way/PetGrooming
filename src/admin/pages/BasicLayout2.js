// index 아울렛 없는 관리자 레이아웃
import React from "react";

import Navbar from "./Navbar";

const BasicLayout = ({ children }) => {
  return (
    <>
      <div className="container mx-auto h-auto">
        <Navbar />

        <main className="container mx-auto h-auto w-full bg-white">
          <div className="flex">{children}</div>
        </main>
      </div>
    </>
  );
};
export default BasicLayout;
