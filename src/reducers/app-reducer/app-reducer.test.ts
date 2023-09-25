import {appReducer, setLoadingStatusAC, setErrorAC, InitialStateType, AppActionsType} from './app-reducer';

describe('appReducer', () => {
    const initialState: InitialStateType = {
        error: null,
        status: 'loading',
    };

    test('should set loading status', () => {
        const action: AppActionsType = setLoadingStatusAC('succeeded');
        const newState = appReducer(initialState, action);

        expect(newState.status).toBe('succeeded');
    });

    test('should set error', () => {
        const action: AppActionsType = setErrorAC('Something went wrong');
        const newState = appReducer(initialState, action);

        expect(newState.error).toBe('Something went wrong');
    });
});