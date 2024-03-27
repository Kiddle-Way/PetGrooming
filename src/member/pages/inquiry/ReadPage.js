import { useCallback } from "react"; 
import { createSearchParams, useNavigate, useParams, useSearchParams } from "react-router-dom"; 
 
const ReadPage = () => { 
 
  const {m_num} = useParams() 
  const navigate = useNavigate() 
const [queryParams] = useSearchParams() 
 
  const page = queryParams.get("page") ? parseInt(queryParams.get("page")) : 1 
const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 10 
 
  const queryStr = createSearchParams({page,size}).toString() 
 
  const moveToModify = useCallback((m_num) => { 
    navigate({ 
      pathname: `/inquiry/modify/${m_num}`, 
      search: queryStr 
    }) 
  },[m_num, page, size]) 

  const moveToList = useCallback(() => { 
    navigate({pathname:`/inquiry/list`, search: queryStr}) 
  }, [page, size])
 
  return (  
    <div className="text-3xl font-extrabold"> 
      문의게시판 Read Page Component {m_num} 
      <div> 
        <button onClick={() => moveToModify(m_num)}>Test Modify</button> 
        <button onClick={() => moveToList()}>Test List</button>
      </div> 
    </div>  
  ); 
 
} 
  
export default ReadPage;