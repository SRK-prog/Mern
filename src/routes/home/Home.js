import React, { useEffect, useState } from "react";
import Cards from "../../components/cards/Cards";
import "./home.css";
import { useLocation } from "react-router";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbox from "../../components/rightbox/Rightbox";
import Nonuser from "../../components/nonuser/Nonuser";
import { Context } from "../../context/Context";
import { useContext } from "react";
import BASE_URL from "../../api/URL";
import Skeleton from "../../components/Skeleton/Skeleton";

function Home() {
  const { user } = useContext(Context);
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    document.title = "Mern";
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await BASE_URL.get("/posts" + search, {
        mode: "cors",
      });
      setPosts(data);
    };
    fetchPosts();
  }, [search]);
  return (
    <>
      <div className="homeFlex">
        <Sidebar />
        {posts.length === 0 ? (
          <>
            <div
              style={{ display: "flex", flexDirection: "column", flex: "6" }}
            >
              {[1, 2, 3, 4, 5].map(() => (
                <Skeleton />
              ))}
            </div>
          </>
        ) : (
          <>{user ? <Cards posts={posts} /> : <Nonuser posts={posts} />}</>
        )}
        <Rightbox />
      </div>
    </>
  );
}

export default Home;
