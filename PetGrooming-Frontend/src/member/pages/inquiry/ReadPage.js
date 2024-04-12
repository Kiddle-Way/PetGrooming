import { useParams } from "react-router-dom";
import ReadComponent from "../../components/inquiry/ReadComponent";

const ReadPage = () => {
  const { i_num } = useParams();

  return (
    <div className="p-4 w-full bg-white">
      <ReadComponent i_num={i_num}></ReadComponent>
    </div>
  );
};
export default ReadPage;
