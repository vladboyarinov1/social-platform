import React, {FC} from 'react';
import {NavLink} from 'react-router-dom';

type DialogsType = {
    id: string
    name: string
}
type MessagesType = {
    id: string
    message: string
}
type PropsType = {
    users: Array<DialogsType>
    messages: Array<MessagesType>
}

export const DialogItem: FC<PropsType> = (props) => {
    const {users, messages} = props

    return <>
        {
            users.map((d) => (
                <div key={d.id}>
                    <NavLink to={'/dialogs/' + d.id}>{d.name}</NavLink>
                </div>
            ))
        }
        {
            messages.map((m) => (
                <div key={m.id}>{m.message}</div>
            ))
        }
    </>
}