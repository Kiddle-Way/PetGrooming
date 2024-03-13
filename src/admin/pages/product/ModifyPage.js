import { useParams } from "react-router-dom";
import ModifyComponent from "../../components/product/ModifyComponent";

const ModifyPage = () => {
  const { p_num } = useParams();
  return (
    <div className="p-4 w-full bg-white">
      <div className="text-2xl font-extrabold"> Todo Modify Page </div>
      <ModifyComponent p_num={p_num} />
    </div>
  );
};
export default ModifyPage;
