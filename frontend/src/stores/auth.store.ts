import hashPassword, { verifyPassword } from "@/lib/passwordManager";
import { router } from "@/router";
import type { IUser } from "@models/userModel";
import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

const WRONG_INPUTS_ERROR: string = "Wrong username or password"
const USERNAME_NOT_PRESENT_ERROR: string = "You are not registered"

export const useAuthStore = defineStore('auth', () => {
    const user = ref<IUser>()
    const backendUrl = "http://localhost:3000/users/"

    function get() {
        return user.value
    }

    function login(username: string, password: string) {
        return axios
            .get<IUser>(backendUrl + username.trim())
            .then(res => verifyPassword(password, res.data.password)
                    .then(match => {
                        if (!match) return
                        
                        user.value = res.data
                        localStorage.setItem('user', JSON.stringify(res.data))
                        router.push('/')
                        return user.value
                    })
            )
    }

    async function logout() {
        user.value = undefined
        router.push("/signup")
    }

    return {login, get}
})

// export const useAuthStore = defineStore('auth', {
//     state: () => ({
//         user: JSON.parse(localStorage.getItem('user') || "{}"),
//         backendUrl: "http://localhost:3000/users/",
//         error: ""
//     }),
//     actions: {
//         async login(username: string, password: string) {
//             const postResult = await axios.get<IUser>(this.backendUrl + username.trim())
//             const passwordsMatch: boolean = await verifyPassword(password, postResult.data.password)
//             if (passwordsMatch) {
//                 console.log("Passwords matches!")
//                 this.user = postResult.data // update pinia state
//                 localStorage.setItem('user', JSON.stringify(postResult.data))
//                 console.log(`Username inside store is ${this.user.username}`)
//                 // router.push("/")
//             }

//             // await axios.get<IUser>(this.backendUrl + username.trim()).then(async res => {
//             //     console.log('axios')
//             //     await verifyPassword(password, res.data.password)
//             //         .then(passwordsMatch => {
//             //             console.log('pwd verify')
//             //             if (passwordsMatch) {
//             //                 // store user data in session
//             //                 // this.user = res.data
//             //                 localStorage.setItem('user', JSON.stringify(res.data))
//             //                 router.push("/")
        
//             //             } else {
//             //                 localStorage.setItem('error', WRONG_INPUTS_ERROR)
//             //             }
//             //         })
//             //     })
//             //     .catch(error => {
//             //         console.log(error)
//             //         if (error.response && error.response.status == 404) {
//             //             localStorage.setItem('error', USERNAME_NOT_PRESENT_ERROR)
//             //         } else {
//             //             localStorage.setItem('error', WRONG_INPUTS_ERROR)
//             //         }
//             //     })
//         },
//         async logout(username: string) {

//         },
//         async register(name: string, surname: string, username: string, email: string, password: string, passwordCheck: string) {
//             console.log("registration process")
//             // validation

//             // password hash
//             hashPassword(password).then(hash => {
//                 axios.post('http://localhost:3000/users', {
//                     name: name,
//                     surname: surname,
//                     username: username,
//                     email: email,
//                     password: hash,
//                     reputation: 0
//                 })
//                 .then(res => {
//                     console.log(res)
//                     localStorage.setItem('user', JSON.stringify(res.data))
//                     router.push("/")
//                 })
//                 .catch(err =>  {
//                     console.log(err)
//                 })
//             })
//             .catch(err => console.log(err))

//         }
//     }
// })