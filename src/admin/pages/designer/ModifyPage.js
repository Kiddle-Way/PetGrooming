import { useParams } from "react-router-dom";
import ModifyComponent from "../../components/designer/ModifyComponent";

const ModifyPage = () => {

  const { dno } = useParams();

  return (
    <div className="p-4 w-full bg-white">
      <div className="text-3xl font-extrabold">수정페이지</div>
      <ModifyComponent dno={dno} />
    </div>
  );
}
export default ModifyPage;
