import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";
import { HEROKU_URL } from "../../Heroku_Url";
import NoPic from "../../noAvatar.png";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    const getUser = async () => {
      try {
        const res = await axios(HEROKU_URL + "/users?userId=" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);
  return (
    <>
      <div className="conversation">
        <img
          className="conversationImg"
          src={user?.profilepicture ? user.profilepicture : NoPic}
          alt=""
        />
        <span className="conversationName">{user?.username}</span>
      </div>
    </>
  );
}
