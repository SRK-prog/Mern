import "./Nonuser.css";
import Nonusercard from "./Nonusercard";
import { Link } from "react-router-dom";

function Nonuser({ posts }) {
  return (
    <div className="Noncards">
      <div className="LoginBanner">
        <div className="LoginBannerMsg">
          <div className="LoginTitle">Welcome!</div>
          <div className="LoginDesc">Register to unlock all features</div>
          <div className="LoginBanBtn">
            <Link className="LoginBanButton" to="signup">
              Register
            </Link>
          </div>
        </div>
      </div>
      {posts
        .slice(0)
        .reverse()
        .map((p) => (
          <Nonusercard post={p} key={p._id} />
        ))}
    </div>
  );
}

export default Nonuser;
