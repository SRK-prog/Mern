import "./Cards.css";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import ModeCommentOutlinedIcon from "@material-ui/icons/ModeCommentOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import { Context } from "../../context/Context";
import { useContext, useState, useEffect } from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import axios from "axios";
import { HEROKU_URL } from "../../Heroku_Url";
import NoPic from "../../noAvatar.png";

const CardItem = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [userprof, setUserProf] = useState("");
  const [ProName, setProName] = useState("");
  const { user: currentUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(`${HEROKU_URL}/users`, {
        params: {
          userId: post.userId,
        },
      });
      setUserProf(data.profilepicture);
      setProName(data.username);
    };
    fetchUser();
  }, [post.userId]);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  const likeHandler = () => {
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
        <Link to={`/profile/${ProName}`} className="img-name-box">
          <div>
            <img
              className="profile-img"
              src={userprof ? userprof : NoPic}
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
              <FavoriteIcon onClick={likeHandler} style={{ color: "red" }} />
            ) : (
              <FavoriteBorderOutlinedIcon onClick={likeHandler} />
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

export default CardItem;
