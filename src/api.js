import axios from "axios";

export default axios.create({
    baseURL: "https://work.vint-x.net/api",
    responseType: "json"
}); 