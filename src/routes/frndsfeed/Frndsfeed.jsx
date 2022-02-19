import { useEffect, useState } from "react";
import { useContext } from "react";
import Cards from "../../components/cards/Cards";
import "./Frndspost.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbox from "../../components/rightbox/Rightbox";
import { Context } from "../../context/Context";
import BASE_URL from "../../api/URL";
import Skeleton from "../../components/Skeleton/Skeleton";

function Frndsfeed() {
  const { user } = useContext(Context);
  const [posts, setPostFrnds] = useState([]);

  useEffect(() => {
    document.title = "Mern | Post";
  }, []);

  useEffect(() => {
    const fetchPostFrnds = async () => {
      await BASE_URL.get("/posts/timeline/" + user._id).then(({ data }) => {
        setPostFrnds(data);
      });
    };
    fetchPostFrnds();
  }, [user._id]);

  return (
    <>
      <div className="FrndsfeedFlex">
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
          <>
            {" "}
            <Cards posts={posts} />{" "}
          </>
        )}
        <Rightbox />
      </div>
    </>
  );
}

export default Frndsfeed;
