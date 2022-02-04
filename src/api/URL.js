import axios from "axios";

export default axios.create({
  baseURL: "https://mernstack-backend-server.herokuapp.com/api",
});

// https://mernstack-backend-server.herokuapp.com/api
