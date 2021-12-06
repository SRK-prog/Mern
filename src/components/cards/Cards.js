import React from "react";
import "./Cards.css";
import CardItem from "../../components/cards/CardItem";
import { NavLink } from "react-router-dom";

function Cards({ posts }) {
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
      {posts
        .slice(0)
        .reverse()
        .map((p) => (
          <CardItem post={p} key={p._id} />
        ))}
    </div>
  );
}

export default Cards;
