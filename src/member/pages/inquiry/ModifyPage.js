import { useParams } from "react-router-dom";
import ModifyComponent from "../../components/inquiry/ModifyComponent";

const ModifyPage = () => {
  const { i_num } = useParams();
  return (
    <div className="p-4 w-full bg-white">
      <ModifyComponent i_num={i_num}></ModifyComponent>
    </div>
  );
};
export default ModifyPage;
