import React, {FC} from 'react';
import s from './Profile.module.css'
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {ProfilePageType} from '../../store';
import {updatePhotoTC, UserProfile} from '../../reducers/profile-reducer/profile-reducer';


interface PropsType extends ProfilePageType {
    status: string

    updateStatus: (value: string) => void
    updatePhotoTC: (photo: File) => void
    updateProfileDataTC: (data: UserProfile) => void

}

export const Profile: FC<PropsType> = (props) => {
    return (
        <div className={s.wrapper}>
            <ProfileInfo  updateProfileDataTC={props.updateProfileDataTC} profile={props.profile} status={props.status} updateStatus={props.updateStatus} updatePhotoTC={props.updatePhotoTC}/>
            {/*<MyPostsContainer/>*/}
        </div>
    )
}
