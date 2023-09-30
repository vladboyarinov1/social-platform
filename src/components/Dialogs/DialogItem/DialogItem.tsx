import React, {FC, useState, useRef, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import {Avatar, Box, Card, CardContent, Typography} from '@mui/material';
import {SuperButton} from '../../SuperButton/SuperButton';
import s from './DialogItem.module.css';
import {FriendMessage} from '../FriendMessage/FriendMessage';
import {Message} from '../Message/Message';
import {UniversalInput} from '../../UniversalInput /UniversalInput';
import {addMessageAC} from '../../../reducers/dialogs-reducer/dialogs-reducer';
import {useDispatch} from 'react-redux';
import {log} from 'util';

type DialogsType = {
    id: string;
    name: string;
};

type MessagesType = {
    id: string;
    message: string;
};

export type MessageType = {
    id: string;
    name: string;
    time: string;
    text: string;
};

type PropsType = {
    users: Array<DialogsType>;
    messages: Array<MessagesType>;
    addNewMessage: (value: string) => void;
};

export const DialogItem: FC<PropsType> = (props) => {
    const messageMe: Array<MessageType> = [
        {id: '1', name: 'Vlad', time: '', text: 'Hi, how are you ?'},
        {
            id: '2',
            name: 'Vlad',
            time: '',
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias deserunt doloremque eligendi nam nemo quae quam reprehenderit repudiandae sint voluptate?'
        },
    ];

    const {users, messages, addNewMessage} = props;

    const [message, setMessage] = useState<string>('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const dispatch = useDispatch()

    const addNewMessageHandler = () => {
        dispatch(addMessageAC(message))
        setMessage('');
    };

    const onKeyDownAddPost = () => {
        dispatch(addMessageAC(message))
        setMessage('');
    };

    useEffect(() => {
        // Прокрутка до последнего сообщения при добавлении нового
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({behavior: 'smooth', block: 'end'});
        }
    }, [messages]);

    return (
        <>
            <div style={{display: 'flex', height: '100vh', overscrollBehavior: 'none'}}>
                <div
                    style={{
                        width: '100%',
                        padding: '0 10px 0 10px',
                        flex: '1',
                        overflowY: 'auto',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        // overscrollBehavior: 'none'
                    }}
                >
                    <div>
                        {messageMe.map((m) => (
                            <FriendMessage key={m.id} id={m.id} message={m.text}/>
                        ))}

                        {
                            messages.map((m) => (
                                <Message key={m.id} id={m.id} message={m.message}/>
                            ))
                        }


                        <div ref={messagesEndRef}/>
                        {/* Реф для прокрутки к последнему сообщению */}
                    </div>

                    <div className={s.sendForm}>
                        <UniversalInput value={message} setValue={setMessage} onEnter={onKeyDownAddPost}
                                        placeholder={'Enter'}/>
                        <SuperButton title={'SEND'} onClick={addNewMessageHandler} disabled={false}/>
                    </div>
                </div>
            </div>
        </>
    );
};