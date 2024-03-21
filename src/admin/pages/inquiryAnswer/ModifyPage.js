import { useParams } from "react-router";
import ModifyComponent from "../../components/inquiryAnswer/ModifyComponent";

const ModifyPage = () => {
  const { i_num } = useParams();

  return (
    <div className="p-4 w-full bg-white">
      <ModifyComponent i_num={i_num} />
    </div>
  );
};

export default ModifyPage;
