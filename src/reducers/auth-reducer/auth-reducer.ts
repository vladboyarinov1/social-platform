import {Dispatch} from 'redux';
import {AuthAPI} from '../../api/network-api';
import {FormValuesType} from '../../components/common/Login/Login';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';

export const authReducer = (state: AuthType = initState, action: ActionTypes) => {
    switch (action.type) {
        case 'SET-USER-DATA':
            return {
                ...state,
                ...action.payload,
                isAuth: true
            }
        case 'login/SET-IS-LOGGED-IN':
            return {
                ...state, isAuth: action.value
            }
        default:
            return state
    }
};

export const setAuthUserData = (data: AuthType) => ({type: 'SET-USER-DATA', payload: data} as const)
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

export const setAuthUserTC = () => async (dispatch: Dispatch) => {
    let res = await AuthAPI.setAuthUser()
    try {
        if (res.data.resultCode === 0) {
            dispatch(setAuthUserData(res.data.data));
        }
    } catch (e: any) {
        throw new Error(e)
    }
}
export const loginTC = (data: FormValuesType) => async (dispatch: Dispatch) => {
    let res = await AuthAPI.login(data)
    try {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e: any) {
        handleServerNetworkError(e, dispatch)
    }
}
export const logoutTC = () => async (dispatch: Dispatch) => {
    let res = await AuthAPI.logout()
    try {

        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(false))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e: any) {
        handleServerNetworkError(e, dispatch)
    }
}
//types
export type AuthType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    id: number | null

}
type SetUserData = ReturnType<typeof setAuthUserData>
type SetIsLoggedInAC = ReturnType<typeof setIsLoggedInAC>

const initState: AuthType = {
    id: null,
    userId: null,
    email: null,
    login: null,
    isAuth: false

}
export type ActionTypes = SetUserData | SetIsLoggedInAC



