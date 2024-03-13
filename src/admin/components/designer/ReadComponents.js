import { useEffect, useState } from "react";
import { getOne } from "../../../common/api/designerApi";

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
    </div>
  );
}


    const makeDiv = (
      dname,
      dbirth,
      dgender,
      demail,
      dphone,
      dh_date,
      dstate,
      dintro,
      dattach
    ) => (
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">{dname}</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {dbirth}
          </div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {dgender}
          </div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {demail}
          </div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {dphone}
          </div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {dh_date}
          </div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {dstate}
          </div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {dintro}
          </div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {dattach}
          </div>
        </div>
      </div>
    );

export default ReadComponent;