import "./App.css";
import Home from "./routes/home/Home";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SinglePost from "./routes/singlePost/SinglePost";
import Register from "./routes/register/Register";
import Login from "./routes/login/Login";
import Write from "./routes/write/Write";
import { Context } from "./context/Context";
import { useContext } from "react";
import Profile from "./routes/profile/Profile";
import Settings from "./routes/settings/Settings";
import Frndsfeed from "./routes/frndsfeed/Frndsfeed";
import Error404 from "./routes/errors/Error404";
import Contact from "./routes/contact/Contact";
import Chatapp from "./routes/chatapp/Chatapp";
import About from "./routes/about/About";

function App() {
  const { user } = useContext(Context);

  return (
    <Router>
      <div>
        <Navbar />
      </div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
        <Route path="/write">{user ? <Write /> : <Register />}</Route>
        <Route path="/postdetails/:postId">
          {user ? <SinglePost /> : <Register />}
        </Route>
        <Route path="/profile/:username">
          {user ? <Profile /> : <Register />}
        </Route>
        <Route path="/feeds">{user ? <Frndsfeed /> : <Register />}</Route>
        <Route path="/settings">{user ? <Settings /> : <Register />}</Route>
        <Route path="/error404">
          <Error404 />
        </Route>
        <Route path="/chat">{user ? <Chatapp /> : <Register />}</Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/about">
          <About />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
