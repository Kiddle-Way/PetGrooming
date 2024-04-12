import { useParams } from "react-router-dom";
import ReadComponent from "../../components/notice/ReadComponent";

const ReadPage = () => {
  const { n_num } = useParams();
  return (
    <div className="font-extrabold w-full bg-white mt-6">
      <ReadComponent n_num={n_num}></ReadComponent>
    </div>
  );
};

export default ReadPage;
