import { Link, Outlet } from "react-router-dom";

const MainPage = () => {
  return (
    <div>
      <div className="flex">
        <Link to={"list"}>Notice</Link>
      </div>
      <div className="text-3xl"></div>
      <Outlet />
    </div>
  );
};

export default MainPage;
