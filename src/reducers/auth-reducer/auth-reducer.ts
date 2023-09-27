import {AnyAction, Dispatch} from 'redux';
import {AuthAPI, SecurityCaptcha} from '../../api/network-api';
import {FormValuesType} from '../../components/common/Login/Login';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {RootState} from '@reduxjs/toolkit/dist/query/core/apiState';
import {AppRootStateType} from '../../redux/redux-store';

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
        case 'SET-CAPTCHA':
            return {
                ...state,
                captchaUrl: action.url
            }

        default:
            return state
    }
};

export const setAuthUserData = (data: AuthType) => ({type: 'SET-USER-DATA', payload: data} as const)
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)
export const setCaptcha = (url: null | string) => ({type: 'SET-CAPTCHA', url} as const)

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
export const loginTC = (data: FormValuesType) => async (dispatch: ThunkDispatch<AppRootStateType, unknown, AnyAction>) => {
    let res = await AuthAPI.login(data)
    try {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
        } else {
            if (res.data.resultCode === 10) {
                await dispatch(getCaptcha())
            }
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
export const getCaptcha = () => async (dispatch: ThunkDispatch<AppRootStateType, unknown, AnyAction>) => {
    let res = await SecurityCaptcha.getCaptchaUrl()
    dispatch(setCaptcha(res.data.url))
}

//types
export type AuthType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    id: number | null
    captchaUrl: string | null

}
const initState: AuthType = {
    id: null,
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null

}
export type ActionTypes =
    | ReturnType<typeof setAuthUserData>
    | ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setCaptcha>



