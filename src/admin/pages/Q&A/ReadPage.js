import { useParams } from "react-router";
import ReadComponent from "../../components/Q&A/ReadComponent";

const ReadPage = () => {
  const { f_num } = useParams();
  return (
    <div className="font-extrabold w-full bg-white mt-6">
      <ReadComponent f_num={f_num}></ReadComponent>
    </div>
  );
};

export default ReadPage;
