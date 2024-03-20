import { Link } from "react-router-dom";

const BasicMenu = () => {
  return (
    <nav id="navbar" className=" flex  bg-blue-300">
      <div className="w-4/5 bg-gray-500">
        <ul className="flex p-4 text-white font-bold">
          <li className="pr-6 text-2xl">
            <Link to={"/"}>Main</Link>
          </li>
          <li className="pr-6 text-2xl">
            <Link to={"/about"}>About</Link>
          </li>
          <li className="pr-6 text-2xl">
            <Link to={"/inquiry/"}>고객센터</Link>
          </li>
        </ul>
      </div>

      <div className="w-1/7 flex justify-end bg-orange-300 p-4 font-medium">
        <Link to={"/myPage"} className="text-white text-sm m-1 rounded">MyPage</Link>
      </div>
      <div className="w-1/6 flex justify-end bg-orange-300 p-4 font-medium">
        <Link to={"/join"} className="text-white text-sm m-1 rounded">Join</Link>
      </div>
      <div className="w-1/7 flex justify-end bg-orange-300 p-4 font-medium">
        <Link to={"/login"} className="text-white text-sm m-1 rounded">Login</Link>
      </div>

    </nav>
  );
};
export default BasicMenu;
