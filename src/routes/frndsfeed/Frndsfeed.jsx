import { useEffect, useState } from "react";
import { useContext } from "react";
import Cards from "../../components/cards/Cards";
import "./Frndspost.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbox from "../../components/rightbox/Rightbox";
import { Context } from "../../context/Context";
import BASE_URL from "../../api/URL";

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
        <Cards posts={posts} />
        <Rightbox />
      </div>
    </>
  );
}

export default Frndsfeed;
