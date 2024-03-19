import { useEffect, useState } from "react";
import { getOne } from "../../../common/api/designerApi";
import useCustomMove from "../../../common/hooks/useCustomMove";

const initState = {
dno:0,
dname:"",
dgender:"",
demail :"",
dphone:"",
dstate:"",
dintro:"",
dattach:"",
dbirth:"",
dh_date:"",
  complete: false,
}


const ReadComponent = ({ dno }) => {
  const [designer, setDesigner] = useState(initState); //아직 사용하지   않음
  const { moveToList, moveToModify } = useCustomMove();

  useEffect(() => {
    getOne(dno).then((data) => {
      console.log(data);
      setDesigner(data);
    });
  }, [dno]);

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4 ">
      {makeDiv("Dno", designer.dno)}
      {makeDiv("Dname", designer.dname)}
      {makeDiv("Dbirth", designer.dbirth)}
      {makeDiv("Dgender", designer.dgender)}
      {makeDiv("Demail", designer.demail)}
      {makeDiv("Dphone", designer.dphone)}
      {makeDiv("Dh_date", designer.dh_date)}
      {makeDiv("Dstate", designer.dstate)}
      {makeDiv("Dintro", designer.dintro)}
      {makeDiv("Dattach", designer.dattach)}
      {makeDiv("Complete", designer.complete ? "Completed" : "Not Yet")}



{/* buttons.........start */}
<div className="flex justify-end p-4">
<button type="button"
className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500" 
          onClick={() => moveToList()}
        >
List
</button>
<button type="button"
className="rounded p-4 m-2 text-xl w-32 text-white bg-red-500" 
onClick={() => moveToModify(dno)}
>
Modify
</button>

      </div>
      </div>
  );
}


    const makeDiv = (title, value) => (
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">{title}</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {value}
          </div>
        </div>
      </div>
    );

export default ReadComponent;