import axios from "axios";
import { endpoint } from "./baseUrl";

export const request = axios.create({
    baseURL:`${endpoint}/api/`
})