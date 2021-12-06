import { Button, TextField } from "@material-ui/core";
import "./Login.css";
import { Context } from "../../context/Context";
import { Link } from "react-router-dom";
import { Close } from "@material-ui/icons";
import { useContext, useState } from "react";
import axios from "axios";
import { HEROKU_URL } from "../../Heroku_Url";

export default function Login() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState(false);

  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(HEROKU_URL + "/auth/login", {
        username,
        password,
      });

      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      res.data && window.location.replace("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
      setError(true);
    }
  };

  return (
    <>
      <div style={{ height: "45px" }}></div>
      <div className="LoginWrap">
        <form className="logsingle-post" onSubmit={handleSubmit}>
          <div className="post-title">
            <h2 className="top-title">Login</h2>
            <Link className="top-link" to="/">
              <Close />
            </Link>
          </div>

          <div className="text-box">
            <TextField
              type="name"
              id="label"
              label="Name"
              fullWidth
              variant="outlined"
              onChange={(e) => setusername(e.target.value)}
            />
          </div>
          <div className="text-box">
            <TextField
              type="password"
              id="textarea"
              fullWidth
              label="Password"
              variant="outlined"
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <div className="logpost-btns">
            <Button
              variant="contained"
              fullWidth
              style={{ color: "white", backgroundColor: "#3a8fde" }}
              type="submit"
              disabled={isFetching}
            >
              Login
            </Button>
          </div>
          {error && (
            <div className="error-msg">
              The username or password is incorrect
            </div>
          )}
          <div className="text-box">
            Don't have account<Link to="/signup"> Sign Up</Link>
          </div>
        </form>
      </div>
    </>
  );
}
