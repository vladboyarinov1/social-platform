import React, {FC} from 'react';
import {DialogItem} from './DialogItem/DialogItem';
import commonStyles from '../common/styles/commonStyles.module.css'
import {DialogsPageType} from '../../store';
import s from './Dialogs.module.css'

type PropsType = {
    dialogs: DialogsPageType
    addNewMessage: (newMessage: string) => void
}

export const Dialogs: FC<PropsType> = (props) => {
    const {dialogs, addNewMessage} = props





    return <div className={`${commonStyles.WrapperContent} ${s.dialogsWrapper}`}>
        <DialogItem users={dialogs.users} messages={dialogs.messages} addNewMessage={addNewMessage}/>

    </div>
}