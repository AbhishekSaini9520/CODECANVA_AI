import axios from "axios"

// const API = axios.create({
//   baseURL: "https://codecanvas-ai-evfn.onrender.com/api",
// })

const API = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "https://codecanva-ai-1.onrender.com/api",
})

API.interceptors.request.use((req) => {

  const token = localStorage.getItem("token")

  if (token) {
    req.headers.Authorization = `Bearer ${token}`
  }

  return req
})

export default API
