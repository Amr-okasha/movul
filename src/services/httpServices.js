import axios from "axios"
import { toast } from "react-toastify"


// axios.interceptors.response.use(null, error => {
//     if (!error.response &&! error.response.status >= 400 &&! error.response.status <= 500) {
//         toast.error("This Movie has been deleted")
//         Promise.reject(error)
//     }
//     else { toast.error("unexpected error") }
// })

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    http: axios
}