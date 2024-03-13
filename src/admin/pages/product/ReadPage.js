import { useParams } from "react-router-dom";
import ReadComponent from "../../components/product/ReadComponent";

const ReadPage = () => {
  const { p_num } = useParams();

  return (
    <div className="font-extrabold w-full bg-white mt-6">
      <div className="text-2xl "> Todo Read Page Component {p_num} </div>
      <ReadComponent p_num={p_num}></ReadComponent>
    </div>
  );
};

export default ReadPage;
