import axios from 'axios';
import {UsersPageType} from '../reducers/users-reducer/users-reducer';
import {FormValuesType} from '../components/common/Login/Login';
export type ResponseType<T = {}> = {
    resultCode: number
    fieldsErrors: []
    messages: string[],
    data: T
}
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true
})

export const NetworkAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get<UsersPageType>(`users/?page=${currentPage}&count=${pageSize}`)
    },
    userSubscription(userId: number) {
        return instance.delete(`follow/${userId}`)

    },
    userUnsubscribe(userId: number) {
        return instance.post(`follow/${userId}`)
    }
}

export const AuthAPI = {
    setAuthUser() {
        return instance.get('auth/me')
    },
    login(data: FormValuesType) {
        return instance.post(`auth/login`, data)
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}
export const ProfileAPI = {
    getUserProfile(profileId: number) {
        return instance.get(`profile/${profileId}`)
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, {status})
    }
}