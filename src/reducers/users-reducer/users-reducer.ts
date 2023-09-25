import {NetworkAPI} from '../../api/network-api';
import {Dispatch} from 'redux';
import {updateObjInArray} from '../../utils/follow-unfollow-utils';

export const usersReducer = (state = initState, action: ActionTypes): UsersPageType => {
    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                items: updateObjInArray(state.items, action.id, 'id', {followed: true})
            }
        case 'UNFOLLOW':
            return {
                ...state,
                items: updateObjInArray(state.items, action.id, 'id', {followed: false})
            }

        case 'SET-SUBSCRIPTION':
            return {
                ...state,
                items: state.items.map(u => u.id === action.payload.userId ? {
                    ...u,
                    followed: action.payload.isSubscription
                } : u)
            }
        case 'SET-USERS':
            return {
                ...state, items: [...action.users]
            }
        case 'SET-CURRENT-PAGE':
            return {...state, currentPage: action.currentPage}
        case 'SET-TOTAL-USER-COUNT':
            return {...state, totalCount: action.totalUserCount}
        case 'SET-LOADER':
            return {
                ...state, isFetching: action.isFetching
            }
        case 'SET-DISABLED':
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        default:
            return state
    }
};
//actions creator
export const follow = (id: number) => ({
    type: 'FOLLOW',
    id,
} as const)
export const unFollow = (id: number) => ({
    type: 'UNFOLLOW',
    id,
} as const)
export const setUsers = (users: UserType[]) => ({
    type: 'SET-USERS',
    users
} as const)
export const setCurrentPage = (currentPage: number) => ({type: 'SET-CURRENT-PAGE', currentPage} as const)
export const setTotalUserCount = (count: number) => ({type: 'SET-TOTAL-USER-COUNT', totalUserCount: count} as const)
export const setLoader = (value: boolean) => ({type: 'SET-LOADER', isFetching: value} as const)
export const setDisabled = (userId: number, isFetching: boolean) => ({
    type: 'SET-DISABLED',
    userId,
    isFetching
} as const)
export const setSubscription = (userId: number, isSubscription: boolean) => ({
    type: 'SET-SUBSCRIPTION',
    payload: {userId, isSubscription}
} as const)

//thunk creators
export const setUsersTC = (currentPage: number, pageSize: number) => async (dispatch: Dispatch) => {
    try {
        dispatch(setLoader(true));
        const res = await NetworkAPI.getUsers(currentPage, pageSize);
        dispatch(setCurrentPage(currentPage));
        dispatch(setUsers(res.data.items));
        dispatch(setTotalUserCount(res.data.totalCount));
        dispatch(setLoader(false));
    } catch (e) {
        throw new Error('Error connecting to the network');
    }
};
export const unFollowTC = (userId: number) => async (dispatch: Dispatch<any>) => {
    manageSubscriptionTC(dispatch, userId, NetworkAPI.userSubscription, unFollow)
};
export const followTC = (userId: number) => async (dispatch: Dispatch<any>) => {
    manageSubscriptionTC(dispatch, userId, NetworkAPI.userUnsubscribe, follow)
};
export const manageSubscriptionTC = async (dispatch: Dispatch<any>, userId: number, apiMethod: any, actionCreator: any) => {
    dispatch(setDisabled(userId, true));
    const res = await apiMethod(userId)
    try {
        if (res.data.resultCode === 0) {
            dispatch(actionCreator(userId))
            dispatch(setDisabled(userId, false));
        }
    } catch (e) {
        throw new Error('Some error');
    }
}

//types
export type ActionTypes =
    | ReturnType<typeof follow>
    | ReturnType<typeof unFollow>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalUserCount>
    | ReturnType<typeof setLoader>
    | ReturnType<typeof setDisabled>
    | ReturnType<typeof setSubscription>
export type UserType = {
    id: number
    'photos': {
        'small': null,
        'large': null
    },
    name: string
    status: string,
    // location: { country: string, city: string },
    followed: boolean
}
export type UsersPageType = {
    items: UserType[],
    pageSize: number,
    totalCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
    fake: number
}

export const initState: UsersPageType = {
    items: [],
    pageSize: 8, //элементов на странице
    totalCount: 0, // всего есть элементов
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
    fake: 10
}