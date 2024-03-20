import { useParams } from "react-router-dom";
import MyPageComponent from "../../components/member/MyPageComponent";
import Navbar from "../../../common/layouts/Navbar";

const MyPage = () => {
  const { m_num } = useParams();

  return (
    <div>
      <Navbar />
      <MyPageComponent m_num={m_num}></MyPageComponent>
    </div>
  );
};

export default MyPage;
