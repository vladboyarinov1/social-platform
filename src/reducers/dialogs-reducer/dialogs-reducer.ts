import {DialogsPageType, MessagesType} from '../../store';
import {v1} from 'uuid';

const initState: DialogsPageType = {
    users: [
        {id: v1(), name: 'VLAD'},
        {id: v1(), name: 'Andrew'},
        {id: v1(), name: 'Sveta'},
        {id: v1(), name: 'Sasha'},
        {id: v1(), name: 'Sasha'},
        {id: v1(), name: 'Sasha'},
        {id: v1(), name: 'Sasha'},
        {id: v1(), name: 'Sasha'},
        {id: v1(), name: 'Sasha'},
        {id: v1(), name: 'Sasha'},
        {id: v1(), name: 'VLAD'},
        {id: v1(), name: 'Andrew'},
        {id: v1(), name: 'Sveta'},
        {id: v1(), name: 'Sasha'},
        {id: v1(), name: 'Sasha'},
        {id: v1(), name: 'Sasha'},
        {id: v1(), name: 'Sasha'},
        {id: v1(), name: 'Sasha'},
        {id: v1(), name: 'Sasha'},
        {id: v1(), name: 'Sasha'},
    ],
    messages: [
        {id: v1(), message: 'Hey Megan ! It\'s been a while 😃'},
        {id: v1(), message: 'When can we meet ?'},
        {id: v1(), message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus doloremque itaque veniam vitae. Modi, quibusdam.'},
    ],
}

export const dialogsReducer = (state = initState, action: DialogsAT) => {
    switch (action.type) {
        case 'ADD-MESSAGE':
            debugger
            const newMessage: MessagesType = {
                id: v1(),
                message: action.messageText
            }
            return {
                ...state,
                messages: [ ...state.messages,newMessage]
            };

        default:
            return state
    }
};

export const addMessageAC = (newMessage: string) => ({
    type: 'ADD-MESSAGE',
    messageText: newMessage
} as const)

//types
export type AddMessageAT = ReturnType<typeof addMessageAC>
export type DialogsAT = AddMessageAT
