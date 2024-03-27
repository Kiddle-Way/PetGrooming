import { useParams } from "react-router-dom";
import MyPageComponent from "../../components/member/MyPageComponent";
import BasicLayout from "../../../common/layouts/BasicLayout";

const MyPage = () => {
  const { m_num } = useParams();

  return (
    <div>
      <BasicLayout>
        <MyPageComponent m_num={m_num}></MyPageComponent>
      </BasicLayout>
    </div>
  );
};

export default MyPage;
