// import axios from "axios"


// const api = axios.create({
//     baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
//     withCredentials: true
// })

// export async function register({ username, email, password }) {

//     try {
//         const response = await api.post('/api/auth/register', {
//             username, email, password
//         })

//         return response.data

//     } catch (err) {

//         console.log(err)

//     }

// }

// export async function login({ email, password }) {

//     try {

//         const response = await api.post("/api/auth/login", {
//             email, password
//         })

//         return response.data

//     } catch (err) {
//         console.log(err)
//     }

// }

// export async function logout() {
//     try {

//         const response = await api.get("/api/auth/logout")

//         return response.data

//     } catch (err) {

//     }
// }

// export async function getMe() {

//     try {

//         const response = await api.get("/api/auth/get-me")

//         return response.data

//     } catch (err) {
//         console.log(err)
//     }

// }



// import axios from "axios"

// const api = axios.create({
//     baseURL: import.meta.env.VITE_API_URL,
//     withCredentials: true
// })

// /**
//  * REGISTER
//  */
// export async function register({
//     username,
//     email,
//     password
// }) {

//     try {

//         const response = await api.post(
//             "/api/auth/register",
//             {
//                 username,
//                 email,
//                 password
//             }
//         )

//         return response.data

//     } catch (err) {

//         console.log(err)

//         throw err
//     }
// }

// /**
//  * LOGIN
//  */
// export async function login({
//     email,
//     password
// }) {

//     try {

//         const response = await api.post(
//             "/api/auth/login",
//             {
//                 email,
//                 password
//             }
//         )

//         return response.data

//     } catch (err) {

//         console.log(err)

//         throw err
//     }
// }

// /**
//  * LOGOUT
//  */
// export async function logout() {

//     try {

//         const response = await api.get(
//             "/api/auth/logout"
//         )

//         return response.data

//     } catch (err) {

//         console.log(err)

//         throw err
//     }
// }

// /**
//  * GET CURRENT USER
//  */
// export async function getMe() {

//     try {

//         const response = await api.get(
//             "/api/auth/get-me"
//         )

//         return response.data

//     } catch (err) {

//         console.log(err)

//         throw err
//     }
// }

// export default api


import axios from "axios"

const API_URL =
    "https://resumeai-backend-of01.onrender.com"

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true
})

export async function register({
    username,
    email,
    password
}) {

    const response = await api.post(
        "/api/auth/register",
        {
            username,
            email,
            password
        }
    )

    return response.data
}

export async function login({
    email,
    password
}) {

    const response = await api.post(
        "/api/auth/login",
        {
            email,
            password
        }
    )

    return response.data
}

export async function logout() {

    const response = await api.get(
        "/api/auth/logout"
    )

    return response.data
}

export async function getMe() {

    const response = await api.get(
        "/api/auth/get-me"
    )

    return response.data
}

export default api