import R from "./httpServices"
import { apiURL } from "../config.json"
import jwtDecode from "jwt-decode"

const apiEndPoint = apiURL + "/auth"
const tokenKey = "token"
async function login(email, password) {
    const { data: jwt } = await R.http({
        url: apiEndPoint,
        method: "POST",
        data: { email, password }
    })
    localStorage.setItem(tokenKey, jwt);

}
function getToken() {
    localStorage.getItem("token")

}
function loginWithJWT(jwt) {
    localStorage.setItem(tokenKey, jwt)
}
function logout() {
    localStorage.removeItem(tokenKey);
}

function getCurrentUser() {

    try {
        const jwt = localStorage.getItem(tokenKey)
        const user = jwtDecode(jwt)
        return user
    } catch (ex) {
        const user = null
        return user
    }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default { login, logout, getCurrentUser, loginWithJWT, getToken }

