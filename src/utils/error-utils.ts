import {
    setErrorAC,
    SetErrorACType,
    setLoadingStatusAC,
    SetLoadingStatusACType
} from '../reducers/app-reducer/app-reducer';
import {Dispatch} from 'redux';


type ErrorUtilsDispatchType = Dispatch<SetErrorACType | SetLoadingStatusACType>
// generic function
export const handleServerAppError = <T>(data: any, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(setErrorAC(data.messages[0]))
    } else {
        dispatch(setErrorAC('Some error occurred'))
    }
    dispatch(setLoadingStatusAC('failed'))

}

export const handleServerNetworkError = (error: { message: string }, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setErrorAC(error.message || 'Some error'))
    dispatch(setLoadingStatusAC('failed'))

}


