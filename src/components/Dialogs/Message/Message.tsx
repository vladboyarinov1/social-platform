import React, {FC} from 'react';
import {
    ImageAndText,
    ImageAndTime,
    MessageBlock,
    MessageName,
    MessageText, MessageTextBlock,
    Time
} from '../commonMessageStyles/CommonMessageStyles';
import {Avatar} from '@mui/material';

type PropsType = {

    id: string
    message: string
}

export const Message: FC<PropsType> = ({id, message}) => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return (
        <MessageBlock id={'hw1-message-' + id}>
            <ImageAndText>
                <ImageAndTime>
                    <Avatar variant="circular" alt="Remy Sharp"/>
                    <Time id={'hw1-time-' + id}>
                        {`${hours}:${minutes}`}
                    </Time>
                </ImageAndTime>
                <MessageText>
                    <MessageName id={'hw1-name-' + id}>
                        Vlad
                    </MessageName>
                    <MessageTextBlock id={'hw1-text-' + id}>
                        {/*{message.text}*/}
                        {message}
                    </MessageTextBlock>
                </MessageText>
            </ImageAndText>
        </MessageBlock>
    )
};