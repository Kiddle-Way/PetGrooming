import { useParams } from "react-router-dom"; 
import MyPageComponent from '../../components/member/MyPageComponent';

const MyPage = () => {

  const {m_num} = useParams()

  return (
    <div>
      <MyPageComponent m_num={m_num}></MyPageComponent>
    </div>
  );
}

export default MyPage;