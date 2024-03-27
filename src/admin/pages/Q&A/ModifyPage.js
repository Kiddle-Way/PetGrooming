import { useParams } from "react-router";
import ModifyComponent from "../../components/Q&A/ModifyComponent";

const ModifyPage = () => {
  const { f_num } = useParams();

  return (
    <div className="p-4 w-full bg-white">
      <ModifyComponent f_num={f_num} />
    </div>
  );
};

export default ModifyPage;
