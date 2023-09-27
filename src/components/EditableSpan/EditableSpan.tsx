import React, {ChangeEvent, FC, useState} from 'react';
import {Input, TextField} from '@mui/material';

type PropsType = {
    status: string,
    updateStatus: (value: string) => void
}

export const EditableSpan: FC<PropsType> = (props) => {
    const [editMode, setEditMode] = useState(false)
    const [updatedStatus, setUpdatedStatus] = useState(props.status || '')

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(updatedStatus)
    }


    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdatedStatus(e.currentTarget.value)
    }


    return (
        <div style={{padding: '10px'}}>
            {!editMode ?
                <span onDoubleClick={activateEditMode}>{props.status ? <div><b>status:</b> {props.status}</div> : 'Статус не установлен'}</span> :
                <TextField onChange={onChangeStatusHandler} autoFocus value={updatedStatus}
                       onBlur={deactivateEditMode} type="text" variant={'outlined'} size='small'/>}
        </div>
    );

}