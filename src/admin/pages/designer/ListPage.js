import ListComponent from "../../components/designer/ListComponent";
import { Link } from "react-router-dom";

const ListPage = () => {
  // const [queryParams] = useSearchParams();
  // const page = queryParams.get("page") ? parseInt(queryParams.get("page")) : 1;
  // const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 10;

  return (
    <>
      <div className="p-4 w-full bg-white flex items-center">
        <div className="text-2xl font-extrabold mx-auto">디자이너</div>
      </div>
      <ListComponent />
    </>
  );
};
export default ListPage;
