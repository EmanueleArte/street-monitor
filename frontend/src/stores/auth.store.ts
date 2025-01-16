import { verifyPassword } from "@/lib/passwordManager";
import { router } from "@/router";
import type { IUser } from "@models/userModel";
import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

const WRONG_INPUTS_ERROR: string = "Wrong username or password"
const USERNAME_NOT_PRESENT_ERROR: string = "You are not registered"

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: JSON.parse(localStorage.getItem('user') || "{}"),
        backendUrl: "http://localhost:3000/users/",
        error: ""
    }),
    actions: {
        async login(username: string, password: string) {
            await axios.get<IUser>(this.backendUrl + username.trim()).then(async res => {
                console.log('axios')
                await verifyPassword(password, res.data.password)
                    .then(passwordsMatch => {
                        console.log('pwd verify')
                        if (passwordsMatch) {
                            // store user data in session
                            this.user = res.data
                            localStorage.setItem('user', JSON.stringify(res.data))
                            router.push("/")
        
                        } else {
                            localStorage.setItem('error', WRONG_INPUTS_ERROR)
                        }
                    })
                })
                .catch(error => {
                    console.log(error)
                    if (error.response && error.response.status == 404) {
                        localStorage.setItem('error', USERNAME_NOT_PRESENT_ERROR)
                    } else {
                        localStorage.setItem('error', WRONG_INPUTS_ERROR)
                    }
                })
        }
    }
})