import s from './ProfileInfo.module.css';
import userAvatar from '../../../img/userAvatar.svg';
import {updatePhotoTC, UserProfile} from '../../../reducers/profile-reducer/profile-reducer';
import {EditableSpan} from '../../EditableSpan/EditableSpan';
import {ProfileUserData} from './ProfileUserData/ProfileUserData';
import {ChangeEventHandler, FC} from 'react';
import {Avatar, Button} from '@mui/material';
import styled from 'styled-components';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import {useSelector} from 'react-redux';

type PropsType = {
    profile: UserProfile | null;
    status: string;
    updateStatus: (value: string) => void;
    updatePhotoTC: (photo: File) => void;
    updateProfileDataTC: (data: UserProfile) => void;
    // Добавлено свойство currentUserId
};

export const ProfileInfo: FC<PropsType> = (props) => {

    const userId = useSelector<any>((state) => state.auth.id);


    const onClickPhotoHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            props.updatePhotoTC(file);
        }
    };

    const isOwnProfile = props.profile?.userId === userId; // Проверка на собственный профиль


    return (
        <>
            <div className={s.profile}>
                <div className={s.avatar}>
                    <Avatar sx={{width: '140px', height: '140px'}} variant={'rounded'} src={props.profile?.photos.small}/>
                </div>
                {isOwnProfile ? (
                    <EditableSpan status={props.status} updateStatus={props.updateStatus}/>
                ) : (
                    <div style={{padding: '10px'}}>{props.status || '---'}</div>
                )}
                {isOwnProfile && (
                    <>
                        <Button onClick={() => {
                        }} component="label" variant="contained" startIcon={<AddPhotoAlternateIcon/>}>
                            Upload file
                            <VisuallyHiddenInput onChange={onClickPhotoHandler} type="file"/>
                        </Button>
                    </>
                )}
                <ProfileUserData isOwnProfile={isOwnProfile} initialValues={props.profile}
                                 onSubmit={props.updateProfileDataTC}/>
            </div>
        </>
    );
};

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: '1px',
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: '1px',
});