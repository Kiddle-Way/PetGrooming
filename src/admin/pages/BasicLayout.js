import Navbar from "../pages/navbar";
import { Outlet } from "react-router-dom";

const BasicLayout = ({ children }) => {
  return (
    <>
      <div style={{ width: "80%", margin: "0 auto" }}>
        <Navbar />

        <div className="bg-white w-full h-screen flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <aside className="w-1/6 h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            {children}
          </aside>

          <main className=" w-full bg-white px-5">
            <div className="flex flex-wrap">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
export default BasicLayout;
