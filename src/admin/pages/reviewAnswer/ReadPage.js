import { useParams } from "react-router";
import ReadComponent from "../../components/reviewAnswer/ReadComponent";
import ReadComponent2 from "../../../member/components/review/ReadComponent";

const ReadPage = () => {
  const { v_num } = useParams();
  return (
    <div className="p-4 w-full bg-white">
      <ReadComponent2 v_num={v_num}></ReadComponent2>
      <ReadComponent v_num={v_num}></ReadComponent>
    </div>
  );
};

export default ReadPage;
