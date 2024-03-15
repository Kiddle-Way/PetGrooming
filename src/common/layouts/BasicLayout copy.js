import React from "react";
import { Link } from "react-router-dom";
import logo2 from "../../image/logo12.jpg";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const BasicLayout = ({ children }) => {
  return (
    <>
      <div className="container mx-auto h-auto">
        <Navbar />

        <main className=" w-full bg-white">
          <div className="flex">{children}</div>
        </main>

        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
};
export default BasicLayout;
