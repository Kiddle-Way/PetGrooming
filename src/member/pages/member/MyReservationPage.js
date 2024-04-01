import { useParams } from "react-router-dom";
import MyReservationComponent from "../../components/member/MyReservationComponent";
import BasicLayout from "../../../common/layouts/BasicLayout";

const MyReservationPage = () => {
  const { m_num } = useParams();

  return (
    <div>
      <BasicLayout>
        <MyReservationComponent m_num={m_num}></MyReservationComponent>
      </BasicLayout>
    </div>
  );
};

export default MyReservationPage;
