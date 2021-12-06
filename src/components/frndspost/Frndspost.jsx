import "../cards/Cards.css";
import Frndspostcard from "./Frndspostcard";
import { NavLink } from "react-router-dom";

function Frndspost({ postFrnds }) {
  return (
    <div className="cardss">
      <div className="CardsNavLink">
        <NavLink
          className="CardsNavLinks"
          exact
          to="/"
          activeClassName="ActiveLink"
        >
          Feed
        </NavLink>
        <NavLink
          className="CardsNavLinks"
          to="/feeds"
          activeClassName="ActiveLinkFeed"
        >
          Post
        </NavLink>
      </div>
      {postFrnds
        .slice(0)
        .reverse()
        .map((p) => p.map((mp) => <Frndspostcard post={mp} key={mp._id} />))}
    </div>
  );
}

export default Frndspost;
