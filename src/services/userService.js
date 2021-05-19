import R from "./httpServices"
import { apiURL } from "../config.json"


const apiEndPoint = apiURL + "/users"

export async function register(user) {
    return await R.http({
        method: "POST",
        url: apiEndPoint,
        data: { email: user.username, password: user.password, name: user.name }
    })

}