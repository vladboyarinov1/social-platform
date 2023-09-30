import React, { FC } from 'react';
import styled from 'styled-components';
import {
    ImageAndText,
    ImageAndTime,
    MessageBlock,
    MessageName,
    MessageTextBlock, Time
} from '../commonMessageStyles/CommonMessageStyles';
import {Avatar} from '@mui/material';

type PropsType = {
    id: string
    message: string
}

export const FriendMessage: FC<PropsType> = ({id, message}) => {
    return (
        <FriendMessageBlock id={'hw1-friend-message-' + id}>
            <FriendImageAndText>
                <FriendImageAndTime>
                    <Avatar variant="circular" alt="Remy Sharp" />
                    <Time id={'hw1-friend-time-' + id}>
                        8:03
                    </Time>
                </FriendImageAndTime>
                <FriendMessageText>
                    <FriendMessageName id={'hw1-friend-name-' + id}>
                        {/*{message.user.name}*/}
                       Sasha
                    </FriendMessageName>
                    <FriendMessageTextBlock id={'hw1-friend-text-' + id}>
                        {message}
                    </FriendMessageTextBlock>
                </FriendMessageText>
            </FriendImageAndText>
        </FriendMessageBlock>
    )
};

let FriendMessageBlock = styled(MessageBlock)`
  justify-content: start;
`

let FriendImageAndText = styled(ImageAndText)`
  flex-direction: row;
`

let FriendImageAndTime = styled(ImageAndTime) `
  padding-right: 12px;
  padding-left: 0;
`

let FriendMessageText = styled.div`
  position: relative;
  background-color: #F5F7FB;
  border-radius: 6px 6px 0px 6px;
  padding: 7px 13px;
  max-width: 500px;


  *::before {
    content: "";
    position: absolute;
    left: -10px;
    bottom: 0px;
    border-width: 10px;
    border-style: solid;
    transform: rotate(90deg);
    border-color: transparent #F5F7FB transparent transparent;
  }

`
let FriendMessageTextBlock = styled(MessageTextBlock)`
    color: #000000;
`
let FriendMessageName = styled(MessageName) `
  color: #000000;
`





