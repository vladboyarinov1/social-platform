import React, { FC } from 'react';
import s from '../Users.module.css';
import {Link} from 'react-router-dom';
import userAvatar from '../../../img/userAvatar.svg';

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
              <div className={s.imgContainer}><img className={s.img}
                                                   src={smallImg !== null ? smallImg : userAvatar}
                                                   alt=""/></div>
          </Link>
          <div className={s.mainBlock}>
              <div className={s.fullName}>{name}</div>
              <div className={s.status}>{status}</div>
              <div className={s.locationBlock}>
              </div>
          </div>
          {followed ? <button disabled={disabled}
                                className={`${s.button} ${s.unfollowBtn}`}
                                onClick={() => unFollowTC(userId)}>Отписаться</button> :
              <button disabled={disabled}
                      className={s.button}
                      onClick={() => followTC(userId)}>Подписаться</button>}
      </div>
  );
};