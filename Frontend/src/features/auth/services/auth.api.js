import axios from "axios"


const api = axios.create({
    baseURL: "https://resumeai-backend-1pm4.onrender.com",
    withCredentials: true
})

export async function register({ username, email, password }) {

    try {
        const response = await api.post('/api/auth/register', {
            username, email, password
        })

        return response.data

    } catch (err) {

        console.log(err)

    }

}

export async function login({ email, password }) {

    try {

        const response = await api.post("/api/auth/login", {
            email, password
        })

        return response.data

    } catch (err) {
        console.log(err)
    }

}

export async function logout() {
    try {

        const response = await api.get("/api/auth/logout")

        return response.data

    } catch (err) {

    }
}

export async function getMe() {

    try {

        const response = await api.get("/api/auth/get-me")

        return response.data

    } catch (err) {
        console.log(err)
    }

}

// import axios from "axios"

// const api = axios.create({
//     baseURL: "http://localhost:3000/api"
// })

// // Automatically attach token
// api.interceptors.request.use((config) => {

//     const token = localStorage.getItem("token")

//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`
//     }

//     return config
// })


// // ---------------- REGISTER ----------------
// export async function register({ username, email, password }) {

//     try {

//         const response = await api.post("/auth/register", {
//             username,
//             email,
//             password
//         })

//         // save token
//         if (response.data.token) {
//             localStorage.setItem("token", response.data.token)
//         }

//         return response.data

//     } catch (err) {

//         console.log(err)

//         return null
//     }
// }


// // ---------------- LOGIN ----------------
// export async function login({ email, password }) {

//     try {

//         const response = await api.post("/auth/login", {
//             email,
//             password
//         })

//         // save token
//         if (response.data.token) {
//             localStorage.setItem("token", response.data.token)
//         }

//         return response.data

//     } catch (err) {

//         console.log(err)

//         return null
//     }
// }


// // ---------------- LOGOUT ----------------
// export async function logout() {

//     try {

//         localStorage.removeItem("token")

//         const response = await api.get("/auth/logout")

//         return response.data

//     } catch (err) {

//         console.log(err)

//         return null
//     }
// }


// // ---------------- GET ME ----------------
// export async function getMe() {

//     try {

//         const response = await api.get("/auth/get-me")

//         return response.data

//     } catch (err) {

//         console.log(err)

//         return null
//     }
// }