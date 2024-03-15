import { useParams } from "react-router-dom";
import ModifyComponent from "../../components/review/ModifyComponent";

const ModifyPage = () => {
  const { v_num } = useParams();
  return (
    <div className="p-4 w-full bg-white">
      <div className="text-3xl font-extrabold">Products Modify Page</div>
      <ModifyComponent v_num={v_num}></ModifyComponent>
    </div>
  );
};
export default ModifyPage;
