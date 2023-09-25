import {dialogsReducer, addMessageAC, DialogsAT} from './dialogs-reducer';

describe('dialogsReducer', () => {
    test('should add a new message', () => {
        const initialState = {
            users: [
                {id: '1', name: 'VLAD'},
                {id: '2', name: 'Andrew'},
            ],
            messages: [
                {id: '1', message: 'Yo! How are you?'},
            ],
        };

        const action: DialogsAT = addMessageAC('New message');
        const newState = dialogsReducer(initialState, action);

        expect(newState.messages.length).toBe(2);
        expect(newState.messages[0].message).toBe('New message');
    });

});