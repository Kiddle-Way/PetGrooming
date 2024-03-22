import { useParams } from "react-router-dom";
import ModifyComponent from "../../components/notice/ModifyComponent";

const ModifyPage = () => {
  const { n_num } = useParams();

  return (
    <div className="p-4 w-full bg-white">
      <ModifyComponent n_num={n_num} />
    </div>
  );
};

export default ModifyPage;
