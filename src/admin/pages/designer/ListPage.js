import ListComponent from "../../components/designer/ListComponent";
import { Link } from "react-router-dom";

const ListPage = () => {
  return (
    <>
      <div className="p-4 w-full bg-white flex justify-between items-center">
        <div className="text-2xl font-extrabold">디자이너 관리</div>
        <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-bold text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
          <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            <Link to="/designer/add">등록</Link>
          </span>
        </button>
      </div>
      <div className="m-5 flex-col w-full">
        <ListComponent />
      </div>
    </>
  );
};
export default ListPage;
