import React, {FC} from 'react';
import s from './Profile.module.css'
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import {ProfilePageType} from '../../store';

interface PropsType extends ProfilePageType {
    status: string,
    updateStatus: (value: string) => void
}

export const Profile: FC<PropsType> = (props) => {
    return (
        <div className={s.wrapper}>
            <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>
            <MyPostsContainer/>
        </div>
    )
}
