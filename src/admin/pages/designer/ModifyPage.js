import { useNavigate } from "react-router-dom";

const ModifyPage = ({ dno }) => {
  const navigate = useNavigate();
  const moveToRead = () => {
    navigate({ pathname: `/designer/read/${dno}` });
  };

  const moveToList = () => {
    navigate({ pathname: `/designer/list` });
  };

  return <div className="text-3xl font-extrabold">Todo Modify Page</div>;
};
export default ModifyPage;
