import hashPassword, { verifyPassword } from "@/lib/passwordManager";
import { router } from "@/router";
import type { IFavoriteSpot } from "@models/favoriteSpotModel";
import type { INotification } from "@models/notificationModel";
import type { IUser } from "@models/userModel";
import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore('auth', () => {
    let user: IUser = JSON.parse(sessionStorage.getItem('user') || "{}")
    const userNotifications = ref<INotification[]>(user.notifications ?? [])
    const userFavoriteSpots = ref<IFavoriteSpot[]>(user.favorite_spots ?? [])
    const backendUrl = "http://localhost:3000/users/"

    function get(): IUser {
        return user
    }

    function setNotifications(notifications: INotification[]) {
        user.notifications = notifications
        sessionStorage.setItem('user', JSON.stringify(user))
        userNotifications.value = notifications
    }

    function setFavoriteSpots(spots: IFavoriteSpot[]) {
        user.favorite_spots = spots
        sessionStorage.setItem('user', JSON.stringify(user))
        userFavoriteSpots.value = spots
    }

    function login(username: string, password: string) {
        return axios
            .get<IUser>(backendUrl + username.trim())
            .then(res => verifyPassword(password, res.data.password)
                .then(match => {
                    if (!match) {
                        return Promise.reject('passwords don\'t match')
                    }

                    user = res.data
                    sessionStorage.setItem('user', JSON.stringify(res.data))
                    router.push('/')
                    return user
                })
            )
    }

    function logout(): void {
        user = JSON.parse("{}")
        sessionStorage.setItem('user', "{}")
        router.push("/signup")
    }

    async function register(values: any): Promise<IUser> {
        const hash: string = await hashPassword(values.password)
        return axios
            .post(backendUrl, {
                ...values,
                password: hash,
                reputation: 0,
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(() => login(values.username, values.password))
    }

    function isLoggedIn(username: string): boolean {
        return user && username === user.username
    }

    function isAdmin(): boolean {
        return user && user.admin === true
    }

    return { login, logout, register, get, isLoggedIn, isAdmin, setNotifications, setFavoriteSpots, notifications: userNotifications, favorite_spots: userFavoriteSpots }
})