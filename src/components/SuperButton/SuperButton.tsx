import React, {FC} from 'react';

type ButtonType = {
    title: string
    onClick: () => void
    disabled: boolean
}

export const SuperButton: FC<ButtonType> = (props) => {
    const {title, onClick, disabled} = props

    const onClickHandler = () => {
        onClick()
    }

    return <button onClick={onClickHandler} disabled={disabled}>{title}</button>
};