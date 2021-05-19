import R from "./httpServices"
import { apiURL } from "../config.json"


const apiEndPoint = apiURL + "/auth"

export async function login(email, password) {
    const { data: jwt } = await R.http({
        url: apiEndPoint,
        method: "POST",
        data: { email, password }
    })
}