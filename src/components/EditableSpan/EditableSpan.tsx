import React, {ChangeEvent, FC, useState} from 'react';

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
                <span onDoubleClick={activateEditMode}>{props.status || 'Статус не установлен'}</span> :
                <input onChange={onChangeStatusHandler} autoFocus value={updatedStatus}
                       onBlur={deactivateEditMode} type="text"/>}
        </div>
    );

}