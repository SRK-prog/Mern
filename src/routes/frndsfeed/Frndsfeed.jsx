import { useEffect, useState } from "react";
import Frndspost from "../../components/frndspost/Frndspost";
import "./Frndspost.css";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbox from "../../components/rightbox/Rightbox";
import { Context } from "../../context/Context";
import { useContext } from "react";
import { HEROKU_URL } from "../../Heroku_Url";

function Frndsfeed() {
  const { user } = useContext(Context);
  const [postFrnds, setPostFrnds] = useState([]);
  const FrndspostUrl = HEROKU_URL + "/posts/timeline/";

  useEffect(() => {
    const fetchPostFrnds = async () => {
      await axios.get(FrndspostUrl + user._id).then((res) => {
        setPostFrnds(res.data);
      });
    };
    fetchPostFrnds();
  }, [FrndspostUrl, user._id]);

  return (
    <>
      <div className="FrndsfeedFlex">
        <Sidebar />
        <Frndspost postFrnds={postFrnds} />
        <Rightbox />
      </div>
    </>
  );
}

export default Frndsfeed;
