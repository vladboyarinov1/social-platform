import {Dispatch} from 'redux';
import {ProfileAPI} from '../../api/network-api';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';

export const profileReducer = (state: { profile: UserProfile | null } = {profile: null}, action: ActionType
) => {
    switch (action.type) {
        // case 'ADD-POST':
        //     const newPost: PostsType = {
        //         id: v1(),
        //         avatar: '',
        //         message: action.postText,
        //         likes: 3
        //     }
        //     return {
        //         ...state,
        //         posts: [newPost, ...state.posts]
        //     };
        case 'SET-USER-PROFILE':
            return {
                ...state, profile: action.data

            }
        case 'SET-STATUS':
            return {
                ...state,
                status: action.status
                // profile: {...state.profile, status: action.status}
            }
        case 'UPDATE-STATUS':
            return {
                ...state,
                status: action.value
            }
        case 'UPDATE-PHOTO':
            // return {
            //     ...state,
            //     profile: {...state, photos: action.photo}
            // }
            return {
                ...state,
                profile: {
                    ...state.profile, photos: action.photo
                }
            }
        default:
            return state
    }
}
//actions creators
export const addPostAC = (newPost: string) => ({type: 'ADD-POST', postText: newPost} as const);
export const setUserProfile = (data: UserProfile) => ({type: 'SET-USER-PROFILE', data} as const)
export const setStatus = (status: string) => ({type: 'SET-STATUS', status} as const)
export const updateStatus = (value: string) => ({type: 'UPDATE-STATUS', value} as const)
export const updatePhoto = (photo: File) => ({type: 'UPDATE-PHOTO', photo} as const)

export const getUserProfile = (profileId: number) => async (dispatch: Dispatch) => {
    try {
        const res = await ProfileAPI.getUserProfile(profileId);
        dispatch(setUserProfile(res.data));
    } catch (e) {
        throw new Error('Error in GET USER PROFILE');
    }
};
export const setUserStatusTC = (userId: number) => async (dispatch: Dispatch) => {
    try {
        const res = await ProfileAPI.getStatus(userId);
        dispatch(setStatus(res.data));
    } catch (e) {
        throw new Error('Error in SET STATUS for user');
    }
};
export const updateStatusTC = (status: string) => async (dispatch: Dispatch) => {
    try {
        await ProfileAPI.updateStatus(status);
        dispatch(updateStatus(status));
    } catch (e) {
        throw new Error('Error in UPDATE STATUS for user');
    }
};
export const updatePhotoTC = (photo: File) => async (dispatch: Dispatch) => {
    debugger
    let res = await ProfileAPI.updatePhoto(photo)
    try {
        if (res.data.resultCode === 0) {
            dispatch(updatePhoto(res.data.data.photos))
        }

    } catch (e) {
        console.log('error photo')
    }
}
export const updateProfileDataTC = (data: UserProfile) => async (dispatch: Dispatch, rejectWithValue: any) => {
    try {
        const res = await ProfileAPI.updateProfileData(data)
        if (res.data.resultCode === 0) {
            dispatch(setUserProfile(data))

        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
        }
    } catch (e: any) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue({errors: [e.errors], fieldsErrors: undefined})
    } finally {
        // dispatch(setLinearProgressAC({value: false}))
    }
}

//types
export type UserProfile = {
    aboutMe: string;
    contacts: {
        facebook: string | null;
        website: string | null;
        vk: string | null;
        twitter: string | null;
        instagram: string | null;
        youtube: string | null;
        github: string | null;
        mainLink: string | null;
    };
    lookingForAJob: boolean;
    lookingForAJobDescription: string | null;
    fullName: string;
    userId: number;
    photos: {
        small: string;
        large: string;
    };
}

type ActionType =
    | ReturnType<typeof addPostAC>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setStatus>
    | ReturnType<typeof updateStatus>
    | ReturnType<typeof updatePhoto>