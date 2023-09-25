import React, {FC} from 'react';
import s from './Profile.module.css'
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import {ProfilePageType} from '../../store';
import {updateProfileDataTC, UserProfile} from '../../reducers/profile-reducer/profile-reducer';

interface PropsType extends ProfilePageType {
    status: string,
    updateStatus: (value: string) => void
    updateProfileDataTC: (data: UserProfile) => void
}

export const Profile: FC<PropsType> = (props) => {
    return (
        <div className={s.wrapper}>
            <ProfileInfo  updateProfileDataTC={props.updateProfileDataTC} profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>
            {/*<MyPostsContainer/>*/}
        </div>
    )
}