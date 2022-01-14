import "./profile.css";
import ScheduleIcon from "@material-ui/icons/Schedule";
import RoomIcon from "@material-ui/icons/Room";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useEffect, useState, useRef } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import { useLocation } from "react-router";
import Userpostitems from "./userposts/Userpostitems";
import { Link } from "react-router-dom";
import { HEROKU_URL } from "../../Heroku_Url";
import NoPic from "../../noAvatar.png";
import { useHistory } from "react-router-dom";

export default function Profile() {
  const [follow, setfollow] = useState([]);
  const [id, setId] = useState();
  const [isfollowed, setIsfollowed] = useState(false);
  const [followings, setfollowings] = useState([]);
  const [desc, setdesc] = useState();
  const [name, setName] = useState();
  const [city, setCity] = useState();
  const [time, setTime] = useState();
  const [Isfollowing, setIsfollowing] = useState();
  const [picture, setPicture] = useState();
  const [userposts, setUserposts] = useState([]);
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const Url = HEROKU_URL + "/posts/profile/";
  const { user: currentUser } = useContext(Context);
  const history = useHistory();
  const myRef = useRef(null);
  const executeScroll = () => scrollToRef(myRef);
  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

  // Follow Feature
  const followHandler = () => {
    try {
      axios.put(HEROKU_URL + "/users/" + id + "/follow", {
        userId: currentUser._id,
      });
      if (!isfollowed) {
        if (!Isfollowing) {
          try {
            axios.post(HEROKU_URL + "/conversations", {
              senderId: currentUser._id,
              receiverId: id,
            });
          } catch (err) {}
        }
      } else if (!Isfollowing) {
        axios.delete(
          `${HEROKU_URL}/conversations/delete/${currentUser._id}/${id}`
        );
      }
    } catch (err) {}
    setfollow(isfollowed ? follow - 1 : follow + 1);
    setIsfollowed(!isfollowed);
  };

  // Fetching users data

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`${HEROKU_URL}/users/${path}`);
      setName(res.data.username);
      setdesc(res.data.desc);
      setCity(res.data.city);
      setTime(res.data.createdAt);
      setPicture(res.data.profilepicture);
      setfollow(res.data.followers.length);
      setfollowings(res.data.followings.length);
      setId(res.data._id);
      setIsfollowing(res.data.followings.includes(currentUser._id));
      setIsfollowed(res.data.followers.includes(currentUser._id));
    };
    fetchUser();
  }, [path, currentUser._id]);

  useEffect(() => {
    axios.get(`${HEROKU_URL}/users/${path}`).catch(() => {
      history.push("/error404");
    });
  }, [path, history]);

  // Fetching user posts

  useEffect(() => {
    const response = async () => {
      await axios.get(Url + path).then((res) => {
        setUserposts(res.data);
      });
    };
    response();
  }, [path, Url]);

  return (
    <div className="ProfileFlexBox">
      <div className="DisplayNoneSidebar">
        <Sidebar />
      </div>
      <div className="ProfileContainer">
        <div className="colorContainer"></div>
        <div>
          <img
            className="ProfileImage"
            src={picture ? picture : NoPic}
            alt=""
          />
          {desc && <div style={{ height: "25px" }}></div>}
          {city && <div style={{ height: "25px" }}></div>}
          <div className="ProfileDetails">
            <div className="FollowFlex">
              <span className="FollowFlexBox"></span>
              <span className="FollowCounts">
                <span
                  onClick={executeScroll}
                  className="Follows"
                  style={{ cursor: "pointer" }}
                >
                  <div className="CountsTitles">Posts</div>{" "}
                  <div className="CountsOf">{userposts.length}</div>
                </span>
                <span className="Follows">
                  <div className="CountsTitles">Followers</div>{" "}
                  <div className="CountsOf">{follow}</div>
                </span>
                <span className="Follows">
                  {" "}
                  <div className="CountsTitles">Following</div>{" "}
                  <div className="CountsOf">{followings}</div>
                </span>
              </span>
            </div>
            <div className="UserInfo">
              <div className="UserName">
                <h2>{name}</h2>
                <p>@{name}</p>
              </div>
              <div className="BtnWrper">
                <div className="BtnSection">
                  <div className="FollowBtn">
                    {name !== currentUser?.username && (
                      <div>
                        {isfollowed ? (
                          <span
                            className="followingbutton"
                            onClick={followHandler}
                          >
                            Following
                          </span>
                        ) : (
                          <span
                            className={
                              !Isfollowing ? "followbutton" : "followbackbutton"
                            }
                            onClick={followHandler}
                          >
                            {Isfollowing ? "FollowBack" : "Follow"}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="FollowBtn">
                    {name !== currentUser?.username && (
                      <Link
                        to="/chat"
                        className="LinkBtn"
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        Messege
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="DescContainer">
              {" "}
              {desc && <div className="UserAbout">{desc}</div>}
            </div>
            <div className="JoinDate">
              {city && (
                <span className="JoinItems">
                  <RoomIcon className="IconSpace" /> {city}
                </span>
              )}
              <span className="JoinItems">
                <ScheduleIcon className="IconSpace" />{" "}
                {new Date(time).toDateString()}
              </span>
            </div>
          </div>
        </div>
        <div className="ProfilePostWrapper">
          <div ref={myRef} className="ProfilePosts">
            {userposts
              .slice(0)
              .reverse()
              .map((p) => (
                <Userpostitems key={p._id} post={p} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
