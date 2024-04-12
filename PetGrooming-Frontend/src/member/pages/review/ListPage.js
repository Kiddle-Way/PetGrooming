import ListComponent from "../../components/review/ListComponent";
import { Link } from "react-router-dom";

const ListPage = () => {
  return (
    <div className="p-4 w-full bg-white">
      <div className="flex justify-end mt-1 mr-5">
        홈 ＞&nbsp;<b>리뷰게시판</b>
      </div>
      <div className="flex mx-auto justify-center text-3xl text-center font-extrabold">리뷰 게시판</div>
      <button class="flex mx-auto items-center justify-end p-0.5 mb-2 me-2 overflow-hidden text-sm font-bold text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
        <span class="flex px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          <Link to="/review/add">글쓰기</Link>
        </span>
      </button>
      <ListComponent />
    </div>
  );
};
export default ListPage;
