import React, {FC, useState} from 'react';
import {DialogItem} from './DialogItem/DialogItem';
import {UniversalInput} from '../UniversalInput /UniversalInput';
import {SuperButton} from '../SuperButton/SuperButton';
import {DialogsPageType} from '../../store';

type PropsType = {
    dialogs: DialogsPageType
    addNewMessage: (newMessage: string) => void
}

export const Dialogs: FC<PropsType> = (props) => {
    const {dialogs, addNewMessage} = props

    const [message, setMessage] = useState<string>('')

    const addNewMessageHandler = () => {
        addNewMessage(message)
        setMessage('')
    }
    const onKeyDownAddPost = () => {
        addNewMessage(message)
        setMessage('')
    }

    return <>
        <div>Dialogs</div>
        <DialogItem users={dialogs.users} messages={dialogs.messages}/>
        <UniversalInput value={message} setValue={setMessage} onEnter={onKeyDownAddPost} placeholder={'Enter'}/>
        <SuperButton title={'SEND'} onClick={addNewMessageHandler} disabled={false}/>
    </>
}