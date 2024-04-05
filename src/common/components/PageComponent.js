
import nextbutton from "../../image/next_button.png"
import backbutton from "../../image/back_button.png"
import lastbutton from "../../image/last_button.png"
import firstbutton from "../../image/first_button.png"

const PageComponent = ({ serverData, movePage }) => {
  return (
    <div className="m-6 flex justify-center">
      {serverData.goToFirstPage ? (
        <div
          className="m-2 p-2 w-8 flex text-center font-bold text-blue-400"
          onClick={() => movePage({ page: serverData.goToFirstPage })}
        >
           <img className="mr-6" src={firstbutton} width="50%" height="100%" alt="Hero" />
        </div>
      ) : null}
      {serverData.prev ? (
        <div
          className="m-2 p-2 w-8 flex text-center font-bold text-blue-400"
          onClick={() => movePage({ page: serverData.prevPage })}
        >
           <img className="mr-6" src={backbutton} width="50%" height="100%" alt="Hero" />
        </div>
      ) : null}
      {serverData.pageNumList.map((pageNum) => (
        <div
          key={pageNum}
          className={`m-2 p-2 w-12 text-center rounded shadow-md text-white 
            ${serverData.current === pageNum ? "bg-gray-500" : "bg-blue-400"}`}
          onClick={() => movePage({ page: pageNum })}
        >
          {pageNum}
        </div>
      ))}
      {serverData.next ? (
        <div
          className="m-2 p-2 w-8 flex text-center font-bold text-blue-400"
          onClick={() => movePage({ page: serverData.nextPage })}
        >
          <img className="mr-6" src={nextbutton} width="50%" height="100%" alt="Hero" />
        </div>
      ) : null}
      {serverData.goToLastPage ? (
        <div
          className="m-2 p-2 w-8 flex text-center font-bold text-blue-400"
          onClick={() => movePage({ page: serverData.goToLastPage })}
        >
          <img className="mr-6" src={lastbutton} width="50%" height="100%" alt="Hero" />
        </div>
      ) : null}
    </div>
  );
};

export default PageComponent;
