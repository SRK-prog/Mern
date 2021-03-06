import { useEffect, useState } from "react";
import "./conversation.css";
import NoPic from "../../noAvatar.png";
import BASE_URL from "../../api/URL";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    const getUser = async () => {
      try {
        const res = await BASE_URL.get("/users?userId=" + friendId);
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
