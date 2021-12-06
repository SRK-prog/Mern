import "./Nonuser.css";
import { format } from "timeago.js";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import ModeCommentOutlinedIcon from "@material-ui/icons/ModeCommentOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import axios from "axios";
import { useState, useEffect } from "react";
import { HEROKU_URL } from "../../Heroku_Url";
import NoPic from "../../noAvatar.png";

const Nonusercard = ({ post }) => {
  const [userprof, setUserProf] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`${HEROKU_URL}/users?userId=${post.userId}`);
      setUserProf(res.data.profilepicture);
    };
    fetchUser();
  }, [post.userId]);

  return (
    <div className="Nonmain-container">
      <div className="Nonprofile-container">
        <span className="Nonimg-name-box">
          <div>
            <img
              className="Nonprofile-img"
              src={userprof ? userprof : NoPic}
              alt=""
            />
          </div>
          <div className="NonNameDate">
            <div className="NonpostUserdate">{post.username}</div>
            <div className="NonpostDate">{format(post.createdAt)}</div>
          </div>
        </span>
      </div>
      <div>
        {post.photo && <img className="Nonmain-pic" src={post.photo} alt="" />}
      </div>
      <div>
        <span>
          <div className="NonPostTitle">{post.title}</div>
          <div className="NonPostDesc">{post.desc}</div>
        </span>
      </div>
      <div className="resIcons">
        <div className="FlexLike">
          <span className="LikeShare">
            <FavoriteBorderOutlinedIcon />
            <span>{post.likes.length}</span>
          </span>
          <span className="LikeShare">
            <ModeCommentOutlinedIcon />
            <span style={{ marginLeft: "3px" }}>{post.comments.length}</span>
          </span>
        </div>
        <div className="shareIcon">
          <ShareOutlinedIcon />
        </div>
      </div>
    </div>
  );
};

export default Nonusercard;
