import React, {ChangeEvent, FC} from 'react';

type InputType = {
    value: string
    setValue: (value: string) => void
    onEnter: () => void
    placeholder: string
}

export const UniversalInput: FC<InputType> = (props) => {
    const {value, setValue, onEnter, placeholder} = props

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    const onKeyDownHandler = (e: any) => {
        if (e.key === 'Enter') {
            onEnter()
        }
    }

    return <input value={value} onChange={onChangeHandler} onKeyDown={onKeyDownHandler} placeholder={placeholder}/>
};