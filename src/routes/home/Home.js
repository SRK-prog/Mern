import React, { useEffect, useState } from "react";
import Cards from "../../components/cards/Cards";
import "./home.css";
import { useLocation } from "react-router";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbox from "../../components/rightbox/Rightbox";
import Nonuser from "../../components/nonuser/Nonuser";
import { Context } from "../../context/Context";
import { useContext } from "react";
import { HEROKU_URL } from "../../Heroku_Url";

function Home() {
  const { user } = useContext(Context);
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(HEROKU_URL + "/posts" + search, {
        mode: "cors",
      });
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);
  return (
    <>
      <div className="homeFlex">
        <Sidebar />
        {user ? <Cards posts={posts} /> : <Nonuser posts={posts} />}
        <Rightbox />
      </div>
    </>
  );
}

export default Home;
