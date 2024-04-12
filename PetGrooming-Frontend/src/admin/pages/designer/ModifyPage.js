import { useParams } from "react-router-dom";
import ModifyComponent from "../../components/designer/ModifyComponent";

const ModifyPage = () => {

  const { d_num } = useParams();

  return (
    <div className="p-4 w-full bg-white">
      <div className="text-3xl font-extrabold">수정페이지</div>
      <ModifyComponent d_num={d_num} />
    </div>
  );
}
export default ModifyPage;
