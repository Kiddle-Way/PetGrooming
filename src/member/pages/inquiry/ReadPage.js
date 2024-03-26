import { useParams } from "react-router-dom";
import ReadComponent from "../../components/inquiry/ReadComponent";
import ReadComponent2 from "../../../admin/components/inquiryAnswer/ReadComponent";

const ReadPage = () => {
  const { i_num } = useParams();

  return (
    <div className="p-4 w-full bg-white">
      <div className="text-3xl font-extrabold">문의 읽기 페이지</div>
      <ReadComponent i_num={i_num}></ReadComponent>
      <ReadComponent2 i_num={i_num}></ReadComponent2>
    </div>
  );
};
export default ReadPage;
