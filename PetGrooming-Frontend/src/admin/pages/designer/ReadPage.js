import { useParams } from "react-router-dom";
import ReadComponent from "../../components/designer/ReadComponents";

const ReadPage = () => {
  const { d_num } = useParams();

  return (
    <div className="p-4 w-full bg-white">
      <div className="text-3xl font-extrabold"> 디자이너페이지{d_num} </div>
      <ReadComponent d_num={d_num}></ReadComponent>
    </div>
  );
};

export default ReadPage;
