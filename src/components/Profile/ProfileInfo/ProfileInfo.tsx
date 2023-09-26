import s from './ProfileInfo.module.css'
import userAvatar from '../../../img/userAvatar.svg';
import {UserProfile} from '../../../reducers/profile-reducer/profile-reducer';
import {EditableSpan} from '../../EditableSpan/EditableSpan';

import {ProfileUserData} from './ProfileUserData/ProfileUserData';
import {FC} from 'react';

type PropsType = {
    profile: UserProfile | null,
    status: string,
    updateStatus: (value: string) => void
    updateProfileDataTC: (data: UserProfile) => void
}
export const ProfileInfo: FC<PropsType> = (props) => {
    return (
        <>
            <div className={s.profile}>
                <div className={s.avatar}>
                    <img className={s.avatarImg}
                         src={props.profile?.photos.small || userAvatar} alt=""/>
                </div>
                {props.profile?.userId === 27358 ?
                    <EditableSpan status={props.status} updateStatus={props.updateStatus}/> :
                    <div style={{padding: '10px'}}>{props.status || '---'}</div>}

                <ProfileUserData initialValues={props.profile} onSubmit={props.updateProfileDataTC}/>
            </div>
        </>
    );
};
// || {
//                     aboutMe: '',
//                     contacts: {
//                         facebook: null,
//                         website: null,
//                         vk: null,
//                         twitter: null,
//                         instagram: null,
//                         youtube: null,
//                         github: null,
//                         mainLink: null,
//                     },
//                     lookingForAJob: false,
//                     lookingForAJobDescription: null,
//                     fullName: '',
//                     userId: 0,
//                     photos: {
//                         small: '',
//                         large: '',
//                     },
//                 }