import React, {ChangeEvent, FC} from 'react';
import styled from 'styled-components';

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

    return <Textarea value={value} onChange={onChangeHandler} onKeyDown={onKeyDownHandler} placeholder={placeholder}/>
};

let Textarea = styled.input`
  width: calc(80% - 150px); /* вычитаем ширину кнопки */
  padding: 10px;
  border-radius: 20px;
  box-shadow: 0px 5px 20px rgba(29, 33, 38, 0.03), 0px 1px 2px rgba(29, 33, 38, 0.1);
  background: #F5F7FB;
  border: none;
  font-size: 16px;
  resize: none;
  float: left; /* добавляем плавающий элемент */
  margin-right: 10px; /* добавляем отступ справа */

  @media screen and (max-width: 760px) {
    width: 80%;
    margin-right: 0;
    margin-bottom: 10px;
  }
`