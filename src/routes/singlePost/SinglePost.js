import "./SinglePost.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";
import { TextField } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { format } from "timeago.js";
import Image from "../home/images/247141.jpg";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import ModeCommentOutlinedIcon from "@material-ui/icons/ModeCommentOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import MoreVertIcon from "@material-ui/icons//MoreVert";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";
import { useLocation } from "react-router";
import axios from "axios";
import Comments from "../../components/comments/Comments";
import { HEROKU_URL } from "../../Heroku_Url";

export default function SinglePost() {
  const [post, setPost] = useState({});
  const [like, setLike] = useState();
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [isLiked, setIsLiked] = useState(false);
  const { user: currentUser } = useContext(Context);
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [id, setId] = useState();
  const [updateMode, setUpdateMode] = useState(false);
  const [comments, setComments] = useState([]);
  // Comments Toggle Button
  const [commentsbtn, setCommentsbtn] = useState(false);
  const [newcomment, setNewcomment] = useState();

  const CommentsToggle = () => {
    setCommentsbtn(!commentsbtn);
  };
  const likeHandler = () => {
    try {
      axios.put(HEROKU_URL + "/posts/" + id + "/like", {
        userId: currentUser._id,
      });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(HEROKU_URL + "/posts/" + path);
      setComments(res.data.comments);
      setPost(res.data);
      setTitle(res.data.title);
      setId(res.data._id);
      setDesc(res.data.desc);
      setLike(res.data.likes.length);
      setIsLiked(res.data.likes.includes(currentUser._id));
    };
    getPost();
  }, [path, currentUser._id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${HEROKU_URL}/posts/${id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${HEROKU_URL}/posts/${id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false);
    } catch (err) {}
  };

  const handlecommentSubmit = async () => {
    try {
      await axios.put(
        `${HEROKU_URL}/posts/${id}/comment`,
        {
          comments: [{ comment: newcomment, userId: user.username }],
        }
        // window.location.reload(false)
      );
    } catch (err) {}
  };

  return (
    <div className="PostDetailsFlex">
      <Sidebar />
      <div className="DetailsContainer">
        <div className="smain-container">
          <div className="sprofile-container">
            <Link to={`/profile/${post.username}`} className="simg-name-box">
              <div>
                <img className="sprofile-img" src={Image} alt="Dp" />
              </div>
              <div className="sNameDate">
                <div className="spostUserdate">{post.username}</div>
                <div className="spostDate">{format(post.createdAt)}</div>
              </div>
            </Link>
            {post.username === user?.username && (
              <>
                <span className="EditPosition">
                  <MoreVertIcon
                    className="Editbtn"
                    onClick={() => setUpdateMode(!updateMode)}
                  />
                  {/* <span className='EditLabel' >Edit</span> */}
                </span>{" "}
              </>
            )}
          </div>
          <div>
            {post.photo && (
              <img className="smain-pic" src={post.photo} alt="" />
            )}
          </div>
          <span className="sAlink">
            {updateMode ? (
              <>
                <div className="singlePostTitleInput">
                  <TextField
                    type="text"
                    label="Title of post"
                    variant="outlined"
                    fullWidth
                    value={title}
                    className="singlePostTitle"
                    autoFocus
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <TextField
                    label="Description"
                    value={desc}
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    className="singlePostTitle"
                    onChange={(e) => setDesc(e.target.value)}
                  />
                </div>
                <div className="SinglePostBtn">
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "rgb(47, 224, 255)",
                      color: "white",
                    }}
                    onClick={handleDelete}
                  >
                    delete
                  </Button>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "rgb(47, 224, 255)",
                      color: "white",
                    }}
                    onClick={handleUpdate}
                  >
                    Update
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="sPostTitle">{title}</div>
                <div className="sPostDesc">{desc}</div>
              </>
            )}

            <div className="sresIcons">
              <div className="sFlexLike">
                <span className="sLikeShare">
                  {isLiked ? (
                    <FavoriteIcon
                      onClick={likeHandler}
                      style={{ color: "red" }}
                    />
                  ) : (
                    <FavoriteBorderOutlinedIcon onClick={likeHandler} />
                  )}
                  <span>{like}</span>
                </span>
                <span className="sLikeShare">
                  <ModeCommentOutlinedIcon onClick={CommentsToggle} />
                  <span style={{ marginLeft: "3px" }}>{comments.length}</span>
                </span>
              </div>
              <div className="sshareIcon">
                <ShareOutlinedIcon />
              </div>
            </div>
          </span>

          <div className={`CommentsSpacing ${commentsbtn ? "activecom" : ""}`}>
            <h2 style={{ margin: "20px 30px" }}>Comments</h2>
            <div className="CommentsInputWrappers">
              <input
                type="text"
                placeholder="Type a comment..."
                className="InputCommentBox"
                onChange={(e) => setNewcomment(e.target.value)}
              />
              <SendIcon
                className="InputCommentBtn"
                onClick={handlecommentSubmit}
              />
            </div>
            <div className="CommentsContains">
              {comments
                .slice(0)
                .reverse()
                .map((com) => (
                  <Comments
                    com={com.comment}
                    newcomment={newcomment}
                    name={com.userId}
                    key={com._id}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="SinglePostRightFlex"></div>
    </div>
  );
}
