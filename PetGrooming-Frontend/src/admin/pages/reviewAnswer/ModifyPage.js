import { useParams } from "react-router";
import ModifyComponent from "../../components/reviewAnswer/ModifyComponent";

const ModifyPage = () => {
  const { v_num } = useParams();

  return (
    <div className="p-4 w-full bg-white">
      <ModifyComponent v_num={v_num} />
    </div>
  );
};

export default ModifyPage;
