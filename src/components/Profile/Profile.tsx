import React, {FC} from 'react';
import s from './Profile.module.css'
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {ProfilePageType} from '../../store';
import {UserProfile} from '../../reducers/profile-reducer/profile-reducer';
import {light} from '@mui/material/styles/createPalette';

interface PropsType extends ProfilePageType {
    status: string,
    updateStatus: (value: string) => void
    updateProfileDataTC: (data: UserProfile) => void
}

export const Profile: FC<PropsType> = (props) => {
    console.log(props.profile)
    return (
        <div className={s.wrapper}>
            <ProfileInfo  updateProfileDataTC={props.updateProfileDataTC} profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>
            {/*<MyPostsContainer/>*/}
        </div>
    )
}
