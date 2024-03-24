import axios from "axios"
import Globals from "./Globals"
// const token = localStorage.getItem('ACCESS_TOKEN');


export default axios.create({
    baseURL: Globals.BASE_URL,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Authorization",
        "Access-Control-Allow-Methods": "*",
        "Content-Type": "application/json;charset=UTF-8",
    }
})

