import { useParams } from "react-router-dom";
import ReadComponent from "../../components/review/ReadComponent";

const ReadPage = () => {
  const {v_num} = useParams();

  return (
    <div className="p-4 w-full bg-white">
      <div className="text-3xl font-extrabold">review Read Page</div>
      <ReadComponent v_num={v_num}></ReadComponent>
    </div>
  );
};
export default ReadPage;
