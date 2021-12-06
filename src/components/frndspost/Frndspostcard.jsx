import "../cards/Cards.css";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import ModeCommentOutlinedIcon from "@material-ui/icons/ModeCommentOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import { Context } from "../../context/Context";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { HEROKU_URL } from "../../Heroku_Url";
import NoPic from "../../noAvatar.png";

const Frndspostcard = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [userpro, setUserPro] = useState("");
  const { user: currentUser } = useContext(Context);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`${HEROKU_URL}/users?userId=${post.userId}`);
      setUserPro(res.data.profilepicture);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandle = () => {
    try {
      axios.put(HEROKU_URL + "/posts/" + post._id + "/like", {
        userId: currentUser._id,
      });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="main-container">
      <div className="profile-container">
        <Link to={`/profile/${post.username}`} className="img-name-box">
          <div>
            <img
              className="profile-img"
              src={userpro ? userpro : NoPic}
              alt=""
            />
          </div>
          <div className="NameDate">
            <div className="postUserdate">{post.username}</div>
            <div className="postDate">{format(post.createdAt)}</div>
          </div>
        </Link>
      </div>
      <div>
        {post.photo && <img className="main-pic" src={post.photo} alt="" />}
      </div>
      <div>
        <Link className="Alink" to={`/postdetails/${post._id}`}>
          <div className="PostTitle">{post.title}</div>
          <div className="PostDesc">{post.desc}</div>
        </Link>
      </div>
      <div className="resIcons">
        <div className="FlexLike">
          <span className="LikeShare">
            {isLiked ? (
              <FavoriteIcon onClick={likeHandle} style={{ color: "red" }} />
            ) : (
              <FavoriteBorderOutlinedIcon onClick={likeHandle} />
            )}
            <span>{like}</span>
          </span>
          <Link
            to={`/postdetails/${post._id}`}
            style={{ textDecoration: "none", color: "black" }}
            className="LikeShare"
          >
            <ModeCommentOutlinedIcon />
            <span style={{ marginLeft: "3px" }}>{post.comments.length}</span>
          </Link>
        </div>
        <div className="shareIcon">
          <ShareOutlinedIcon />
        </div>
      </div>
    </div>
  );
};

export default Frndspostcard;
