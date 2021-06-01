




const handleErrors = (ex) => {
    const error = { email: "", password: "" }

    //handle error of dublicate
    // if (ex.code === 11000) {
    //     error.email = "this is an exist email please enter other one"
    //     return error
    // }

    //handle schema errors
    if (ex.message.includes("USER validation failed")) {
        Object.values(ex.errors).map(({ properties }) => {
            console.log(properties)
            return error[properties.path] = properties.message
        })


        // handle throw errors
        if (ex.message.includes("In correct email")) {
            return error.email = "In correct email"
        }

        if (ex.message.includes("In correct password")) {
            return error.password = "In correct password"
        }

        if (ex.message.includes("Registred")) {
            return error.email = "Registred email please write other one"
        }

        if (ex.message.includes("User not found")) {
            return error.email = "This email has been deleted"
        }

        return error
    }

}


module.exports = { handleErrors }