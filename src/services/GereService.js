import axios from "axios"
import R from "../services/httpServices"
import config from "../config.json"
export async function getGenres() {
    console.log(config.apiURL, "config")
    return await R.http({
        url: config.apiURL + "/genres",
        method: "GET"
    })

}



