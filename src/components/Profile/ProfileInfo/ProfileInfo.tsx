import React, {FC} from 'react';
import s from './ProfileInfo.module.css'
import userAvatar from '../../../img/userAvatar.svg';
import {UserProfile} from '../../../reducers/profile-reducer/profile-reducer';
import {EditableSpan} from '../../EditableSpan/EditableSpan';

type PropsType = {
    profile: UserProfile | null,
    status: string,
    updateStatus: (value: string) => void
}

export const ProfileInfo: FC<PropsType> = (props) => {


    return (
        <>
            <div className={s.profile}>
                <div className={s.avatar}>
                    <img className={s.avatarImg}
                         src={props.profile?.photos.small || userAvatar} alt=""/>
                </div>
                <div className={s.name}>{props.profile?.fullName}</div>
                {props.profile?.userId === 27358 ?
                    <EditableSpan status={props.status} updateStatus={props.updateStatus}/> :
                    <div style={{padding: '10px'}}>{props.status || '---'}</div>}
                <div>
                    <div className={s.textCols}>
                        <div className={s.textColsLeft}>
                            <div>Обо мне:</div>
                            <div>В поиске работы:</div>
                            <div>GitHub:</div>
                        </div>
                        <div className={s.textColsRight}>
                            <div>{props.profile?.aboutMe || '-'}</div>
                            <div>{props.profile?.lookingForAJob ? '✅' : '❌'}</div>
                            {props.profile?.contacts.github || '-'}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
