import { Link } from "react-router-dom";

import go1 from "../../../image/go1.jpg";

const ReserveComponent1 = () => {
  return (
    <div className="">
      <div className="flex justify-center items-center mb-5">
        <img className="mr-6" src={go1} width="30%" height="30%" alt="Hero" />
        <h2 className="text-2xl w-7/10">
          경력:보듬미용사2010.8~2013.8
          <br />
          00애견샵 2013.8~2015.8
          <br />
          자격증:애견미용사2급
          <br />
          펫아로마관리:1급
        </h2>
        <Link to={{ pathname: "more", search: "?info=1" }}>
          <button className="rounded p-4 w-36 bg-amber-400 textxl text-white">
            예약하기
          </button>
        </Link>
      </div>
      <div className="flex justify-center items-center mb-5">
        <img className="mr-6" src={go1} width="30%" height="30%" alt="Hero" />
        <h2 className="text-2xl w-7/10">
          경력:보듬미용사2010.8~2013.8
          <br />
          00애견샵 2013.8~2015.8
          <br />
          자격증:애견미용사2급
          <br />
          펫아로마관리:1급
        </h2>
        <Link to={{ pathname: "more", search: "?info=2" }}>
          <button className="rounded p-4 w-36 bg-amber-400 textxl text-white">
            예약하기
          </button>
        </Link>
      </div>
      <div className="flex justify-center items-center mb-3">
        <img className="mr-6" src={go1} width="30%" height="30%" alt="Hero" />
        <h2 className="text-2xl w-7/10">
          경력:보듬미용사2010.8~2013.8
          <br />
          00애견샵 2013.8~2015.8
          <br />
          자격증:애견미용사2급
          <br />
          펫아로마관리:1급
        </h2>
        <Link to={{ pathname: "more", search: "?info=3" }}>
          <button className="rounded p-4 w-36 bg-amber-400 textxl text-white">
            예약하기
          </button>
        </Link>
      </div>
      <div className="flex justify-center items-center mb-5">
        <img className="mr-6" src={go1} width="30%" height="30%" alt="Hero" />
        <h2 className="text-2xl w-7/10">
          경력:보듬미용사2010.8~2013.8
          <br />
          00애견샵 2013.8~2015.8
          <br />
          자격증:애견미용사2급
          <br />
          펫아로마관리:1급
        </h2>
        <Link to={{ pathname: "more", search: "?info=4" }}>
          <button className="rounded p-4 w-36 bg-amber-400 textxl text-white">
            예약하기
          </button>
        </Link>
      </div>
      <div className="flex justify-center items-center mb-5">
        <img className="mr-6" src={go1} width="30%" height="30%" alt="Hero" />
        <h2 className="text-2xl w-7/10">
          경력:보듬미용사2010.8~2013.8
          <br />
          00애견샵 2013.8~2015.8
          <br />
          자격증:애견미용사2급
          <br />
          펫아로마관리:1급
        </h2>
        <Link to={{ pathname: "more", search: "?info=5" }}>
          <button className="rounded p-4 w-36 bg-amber-400 textxl text-white">
            예약하기
          </button>
        </Link>
      </div>
    </div>
  );
};
export default ReserveComponent1;
