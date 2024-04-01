import { useParams } from "react-router-dom";
import MyReservationComponent from "../../components/member/MyReservationComponent";

const MyReservationPage = () => {
  const { m_num } = useParams();

  return (
    <div>
      <MyReservationComponent m_num={m_num} />
    </div>
  );
};

export default MyReservationPage;
