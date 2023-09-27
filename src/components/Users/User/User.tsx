import React, {FC} from 'react';
import s from '../Users.module.css';
import {Link} from 'react-router-dom';
import userAvatar from '../../../img/userAvatar.svg';
import {Avatar, Button} from '@mui/material';

type PropsType = {
    userId: number
    name: string
    status: string
    followed: boolean
    disabled: boolean
    followTC: (userId: number) => void
    unFollowTC: (userId: number) => void
    smallImg: null

}

export const User: FC<PropsType> = ({userId, name, followed, smallImg, status, disabled, unFollowTC, followTC}) => {
    return (
        <div className={s.wrapper}>
            <Link to={`/profile/${userId}`}>
                <div className={s.imgContainer}>
                    <Avatar variant="rounded" alt="Remy Sharp" src={smallImg || ''}/>
                </div>
            </Link>
            <div className={s.mainBlock}>
                <div className={s.fullName}>{name}</div>
                <div className={s.status}>{status}</div>
                <div className={s.locationBlock}>
                </div>
            </div>
            {followed ? <Button disabled={disabled}
                                color="error"
                                variant={'contained'}
                                onClick={() => unFollowTC(userId)}>Отписаться</Button> :
                <Button disabled={disabled}
                        variant={'contained'}
                        color="primary"
                        onClick={() => followTC(userId)}>Подписаться</Button>}
        </div>
    );
};