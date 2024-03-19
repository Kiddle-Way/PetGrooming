import { Link } from "react-router-dom";
import logo from "../../image/logo12.jpg";
const Footer = () => {
  return (
    <footer>
      <div>
        <Link to={"/"}>
          <img
            src={logo}
            width="15%"
            height="80%"
            alt="Open"
            style={{ float: "left", left: "20" }}
          />
        </Link>
      </div>
      <div style={{ textAlign: "center" }}>
        <span>
          <Link to={"/"}> 이용약관 </Link>
          {"|"}
          <Link to={"/"}> 개인정보취급방침</Link>
        </span>
        <h2>
          Pet Grooming 서울 금천구 가산디지털1로 101 | T.02-2671-2134 | F.
          02-2671-2133{" "}
        </h2>
        <p>Copyright 펫구루밍. All Rights Reserved.</p>
      </div>
    </footer>
  );
};
export default Footer;
