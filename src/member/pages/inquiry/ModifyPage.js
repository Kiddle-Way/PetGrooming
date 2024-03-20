import { useNavigate } from "react-router-dom"; 
 
const ModifyPage = ({m_num}) => { 
  const navigate = useNavigate() 
  const moveToRead = () => { 
    navigate({pathname:`/inquiry/read/${m_num}`}) 
  } 
  const moveToList = () => { 
    navigate({pathname:`/inquiry/list`}) 
  } 
  return (  
    <div className="text-3xl font-extrabold"> 
      문의게시판 Modify Page  
    </div>  
   ); 
} 
  
export default ModifyPage;