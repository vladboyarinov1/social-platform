import {createStore, applyMiddleware, combineReducers, legacy_createStore, AnyAction} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {profileReducer} from '../reducers/profile-reducer/profile-reducer';
import {dialogsReducer} from '../reducers/dialogs-reducer/dialogs-reducer';
import {usersReducer} from '../reducers/users-reducer/users-reducer';
import {authReducer} from '../reducers/auth-reducer/auth-reducer';
import {appReducer} from '../reducers/app-reducer/app-reducer';
import {composeWithDevTools} from 'redux-devtools-extension';

export type StateType = ReturnType<typeof reducers>;

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
});

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;
export type AppRootStateType = ReturnType<typeof reducers>;

export type AppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>;
export const useAppDispatch = () => useDispatch<AppDispatchType>();

const store = legacy_createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

export default store;