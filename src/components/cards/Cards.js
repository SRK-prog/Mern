import React from "react";
import "./Cards.css";
import CardItem from "../../components/cards/CardItem";
import Navlinks from "./Navlinks";

function Cards({ posts, NoLink }) {
  return (
    <div className="cardss">
      {!NoLink && <Navlinks />}
      {posts
        .slice(0)
        .reverse()
        .map((p) => (p === null ? "" : <CardItem post={p} key={p._id} />))}
    </div>
  );
}

export default Cards;
