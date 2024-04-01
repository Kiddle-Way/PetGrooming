import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const BasicLayout = ({ children }) => {
  return (
    <>
      <div className="container mx-auto h-auto">
        <Navbar />

        <main className="md:container md:mx-auto md:h-auto w-full bg-white">
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
