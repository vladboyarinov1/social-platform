import {v1} from 'uuid';
import {UserProfile} from './reducers/profile-reducer/profile-reducer';
import {dialogsReducer} from './reducers/dialogs-reducer/dialogs-reducer';

export type PostsType = {
    id: string
    avatar: string
    message: string
    likes: number
}
export type DialogsType = {
    id: string
    name: string
}
export type MessagesType = {
    id: string
    message: string
}
export type ProfilePageType = {
    posts: PostsType[] | null[],
    profile: UserProfile | null,
    status: string | null
}
export type DialogsPageType = {
    users: DialogsType[]
    messages: MessagesType[]
}

export type StateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
}


export type StoreType = {
    _state: StateType
    getState: () => StateType
    _callSubscriber: (state: any) => void
    subscribe: (observer: any) => void
    dispatch: (action: any) => void
}

// let store: StoreType = {
//     _state: {
//         profilePage: {
//             posts: [
//                 {id: v1(), avatar: 'ava', message: 'Hello, it\'s my first message', likes: 8},
//                 {id: v1(), avatar: 'ava', message: 'Hello, it\'s my second message', likes: 24}
//             ],
//         },
//         dialogsPage: {
//             users: [
//                 {id: v1(), name: 'Dimych'},
//                 {id: v1(), name: 'Andrew'},
//                 {id: v1(), name: 'Sveta'},
//                 {id: v1(), name: 'Sasha'},
//                 {id: v1(), name: 'Viktor'},
//                 {id: v1(), name: 'Valera'},
//             ],
//             messages: [
//                 {id: v1(), message: 'Yo! How are you?'},
//                 {id: v1(), message: 'Hey! Thanks!'},
//                 {id: v1(), message: 'Ok. See you soon!'},
//                 {id: v1(), message: 'Where are you???'}
//             ],
//         },
//     },
//     getState() {
//         return this._state
//     },
//     _callSubscriber(state: any) {
//         console.log('state changed!')
//     },
//     subscribe(observer: any) {
//         this._callSubscriber = observer
//     },
//     dispatch(action) {
//         this._state.profilePage = profileReducer(this._state.profilePage, action);
//         this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
//         this._callSubscriber(this._state)
//     }
//
// }

// export default store;