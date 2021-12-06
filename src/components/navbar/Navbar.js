import React, { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { Search, Chat } from "@material-ui/icons";
import { Close } from "@material-ui/icons";
import "./Navbar.css";
import MenuIcon from "@material-ui/icons/Menu";
import { Context } from "../../context/Context";
import Menubar from "../sidebar/menubar/Menubar";
import NoPic from "../../noAvatar.png";

export default function Navbar() {
  const [profilebtn, setProfilebtn] = useState(false);
  const [navmenu, setNavmenu] = useState(false);
  const [search, setSearchbox] = useState(false);

  const searchboxtoggle = () => {
    setSearchbox(!search);
  };

  const NavmenuBtn = () => {
    setNavmenu(!navmenu);
  };

  const clicktoggle = () => {
    setProfilebtn(!profilebtn);
  };

  const { user, dispatch } = useContext(Context);
  const handlelogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <>
      <div className="topbarContainer">
        <div className="topbarLeft">
          <OutsideClickHandler
            onOutsideClick={() => {
              setNavmenu(false);
            }}
          >
            {" "}
            <div onClick={() => setNavmenu(false)}>
              <Menubar data={navmenu} />
            </div>
            <button className="menuBtn" onClick={NavmenuBtn}>
              <MenuIcon />
            </button>
          </OutsideClickHandler>

          <Link to="/" className="logo">
            Mern
          </Link>
        </div>
        <div className="topbarCenter">
          <div className="searchbar display_none">
            <Search className="searchIcon" />
            <input placeholder="Search..." className="searchInput" />
          </div>
        </div>
        <div className="topbarRight">
          <div className="topbarLinks">
            {user ? (
              <>
                {" "}
                <Link to="/write" className="styleLink display_none">
                  Create Post
                </Link>{" "}
              </>
            ) : (
              <>
                <Link to="/login" className="topbarLink display_none">
                  Log in
                </Link>
                <Link to="/signup" className="styleLink">
                  Create account
                </Link>
              </>
            )}
          </div>
          {user ? (
            <div className="topbarIcons">
              <div className="topbarIconItemSearch">
                {!search ? (
                  <Search className="Icon" onClick={searchboxtoggle} />
                ) : (
                  <Close className="Icon" onClick={searchboxtoggle} />
                )}
              </div>
              <NavLink
                to="/chat"
                className="topbarIconItem"
                activeClassName="None_chatIcon"
              >
                <Chat className="Icon" />
              </NavLink>
              <OutsideClickHandler
                onOutsideClick={() => {
                  setProfilebtn(false);
                }}
              >
                <div className="topbarIconItem">
                  <img
                    src={user.profilepicture ? user.profilepicture : NoPic}
                    alt=""
                    className="topbarImg"
                    onClick={clicktoggle}
                  />
                </div>

                <div className={`linktoggle ${profilebtn ? "active" : ""}`}>
                  <ul className="linkList">
                    <Link
                      to={`/profile/${user.username}`}
                      className="linkListprofile"
                    >
                      <div style={{ fontSize: "1.2rem" }}>{user.username}</div>
                      <div style={{ fontSize: ".8rem" }}>@{user.username}</div>
                    </Link>
                    <Link to="/write" className="linkListItems">
                      Create post
                    </Link>
                    <Link to="/settings" className="linkListItems">
                      Settings
                    </Link>
                    <button className="linkListbtn" onClick={handlelogout}>
                      Sign Out
                    </button>
                  </ul>
                </div>
              </OutsideClickHandler>
            </div>
          ) : (
            ""
          )}
        </div>
        {search && (
          <div className="SearchBoxPopUp">
            <span className="SearchPopUpInputBox">
              <input
                type="text"
                className="SearchPopUpInput"
                placeholder="Search..."
              />
            </span>
            <span>
              <Search className="SearchPopUpBtn" />
            </span>
          </div>
        )}
      </div>
      <div style={{ height: "55px" }}></div>
    </>
  );
}
