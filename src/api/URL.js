import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5000/api",
});

// https://mernstack-backend-server.herokuapp.com/api
