import { useParams } from "react-router";
import ReadComponent from "../../components/inquiryAnswer/ReadComponent";

const ReadPage = () => {
  const { i_num } = useParams();

  return (
    <div className="p-4 w-full bg-white">
      <ReadComponent i_num={i_num}></ReadComponent>
    </div>
  );
};

export default ReadPage;
