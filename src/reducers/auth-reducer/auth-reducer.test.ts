import {authReducer, setAuthUserData, setIsLoggedInAC, ActionTypes, AuthType} from './auth-reducer';

describe('authReducer', () => {
    const initialState: AuthType = {
        id: null,
        userId: null,
        email: null,
        login: null,
        isAuth: false,
        captchaUrl: null
    };

    test('should set user data', () => {
        const userData: AuthType = {
            id: 1,
            userId: 123,
            email: 'test@example.com',
            login: 'testuser',
            isAuth: true,
            captchaUrl: null
        };

        const action: ActionTypes = setAuthUserData(userData);
        const newState = authReducer(initialState, action);

        expect(newState).toEqual(userData);
    });

    test('should set isLoggedIn', () => {
        const action: ActionTypes = setIsLoggedInAC(true);
        const newState = authReducer(initialState, action);

        expect(newState.isAuth).toBe(true);
    });
});