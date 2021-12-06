import "./Chatapp.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../context/Context";
import { HEROKU_URL } from "../../Heroku_Url";
import axios from "axios";

export default function Chatapp() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [timeout, setTime] = useState(false);
  const { user } = useContext(Context);
  const scrollRef = useRef();

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(HEROKU_URL + "/conversations/" + user._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          HEROKU_URL + "/messages/" + currentChat?._id
        );
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    try {
      const res = await axios.post(HEROKU_URL + "/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (conversations.length >= 1) {
    return (
      <>
        <div className="messenger">
          <div className={`chatMenu ${!currentChat && "ChatmenuActive"}`}>
            <div className="chatMenuWrapper">
              {conversations.map((c) => (
                <div onClick={() => setCurrentChat(c)}>
                  <Conversation conversation={c} currentUser={user} />
                </div>
              ))}
            </div>
          </div>

          <div className="chatBox">
            <div className="chatBoxWrapper">
              {currentChat ? (
                <>
                  <div className="chatBoxTop">
                    <div className="DoNotMsg">
                      Do not share any personal information in chat
                    </div>
                    {currentChat && (
                      <div className="ChatNavItems">
                        <ArrowBackIcon onClick={() => setCurrentChat(null)} />
                      </div>
                    )}
                    {messages.map((m) => (
                      <div ref={scrollRef} key={m._id}>
                        <Message message={m} own={m.sender === user._id} />
                      </div>
                    ))}
                  </div>
                  <div className="chatBoxBottom">
                    <textarea
                      className="chatMessageInput"
                      placeholder="Message..."
                      onChange={(e) => setNewMessage(e.target.value)}
                      value={newMessage}
                    ></textarea>
                    <button className="chatSubmitButton" onClick={handleSubmit}>
                      Send
                    </button>
                  </div>
                </>
              ) : (
                <span className="noConversationText">
                  Open a conversation to start a chat.
                </span>
              )}
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        {timeout && (
          <>
            <div className="NoFrndtitle">
              <div className="NoFrnds">No Friends</div>
              <div className="NoFrndsLabel">
                Follow a Friend To Start Conversation
              </div>
            </div>
          </>
        )}
      </>
    );
  }
}
