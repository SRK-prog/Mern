import { TextField, Button } from "@material-ui/core";
import "./Register.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Close } from "@material-ui/icons";
import axios from "axios";
import { HEROKU_URL } from "../../Heroku_Url";
import { useHistory } from "react-router-dom";

export default function Register() {
  const [username, setusername] = useState("");
  const [emails, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState(false);
  const [disable, setDisable] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emails.toLowerCase();
    setError(false);
    setDisable(true);
    try {
      const res = await axios.post(HEROKU_URL + "/auth/signup", {
        username,
        email,
        password,
      });
      res.data && history.push("/login");
    } catch (err) {
      setDisable(false);
      setError(true);
    }
  };

  return (
    <>
      <div style={{ height: "45px" }}></div>
      <div className="Reswidth">
        <form className="ressingle" onSubmit={handleSubmit}>
          <div className="restitle">
            <span className="restoptitle">Register</span>
            <Link className="restoplink" to="/">
              <Close />
            </Link>
          </div>
          <div className="restextbox">
            <TextField
              type="name"
              id="label"
              label="Name"
              fullWidth
              required
              variant="outlined"
              onChange={(e) => setusername(e.target.value)}
            />
          </div>
          <div className="restextbox">
            <TextField
              type="email"
              id="email"
              fullWidth
              required
              label="Email"
              variant="outlined"
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <div className="restextbox">
            <TextField
              type="password"
              id="password"
              required
              fullWidth
              label="Password"
              variant="outlined"
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          {error && (
            <div style={{ color: "red", marginTop: "7px" }}>
              Something went wrong!
            </div>
          )}
          <div className="respostbtns">
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={disable}
              style={{ color: "white", backgroundColor: "#3a8fde" }}
            >
              Confirm
            </Button>
          </div>
          <div className="restextbox">
            Already have a account<Link to="/login"> Login</Link>
          </div>
        </form>
      </div>
    </>
  );
}
