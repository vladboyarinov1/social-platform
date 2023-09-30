import React, {FC} from 'react';
import styled from 'styled-components';

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

    return <Button onClick={onClickHandler} disabled={disabled}>{title}</Button>
};
let Button = styled.button`
  background-color: #0066CC;
  width: 120px;
  color: #FFFFFF;
  padding: 10px 20px;
  border-radius: 20px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  float: right; /* добавляем плавающий элемент */

  &:hover {
    background-color: #0052A3;
  }

  @media screen and (max-width: 760px) {
    float: none;
    display: block;
    margin: 0 auto;
  }
`