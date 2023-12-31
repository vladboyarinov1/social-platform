import React, {FC} from 'react';
import s from './Users.module.css';
import {Pagination} from '@mui/material';
import {UserType} from '../../reducers/users-reducer/users-reducer';
import {Preloader} from '../common/Preloader/Preloader';
import {User} from './User/User';
import container from  '../common/styles/commonStyles.module.css'
type PropsType = {
    items: UserType[]
    totalUserCount: number
    pageSize: number
    currentPage: number
    isFetching: boolean
    followingInProgress: any[]
    setDisable: (userId: number, isFetching: boolean) => void
    followTC: (userId: number) => void
    unFollowTC: (userId: number) => void
    onPageChanged: (event: React.ChangeEvent<unknown>, pageNumber: number) => void
}

export const Users: FC<PropsType> = (props) => {

    let pagesCount = Math.ceil(props.totalUserCount / props.pageSize)

    const unFollowHandler = (userId: number) => {
        props.unFollowTC(userId)
    }
    const followHandler = (userId: number) => {
        props.followTC(userId)
    }
    const disabled = (currentId: number) => props.followingInProgress.some(id => currentId === id)

    return (
        <div className={`${container.WrapperContent} ${s.usersContainer}`}>
            <Preloader isFetching={props.isFetching}/>
            <div className={!props.isFetching ? s.container : `${s.container} ${s.disabledContainer}`}>
                <div>
                    {
                        props.items.map(u => {
                            return (
                                <User followed={u.followed} key={u.id} userId={u.id} status={u.status}
                                      followTC={followHandler} unFollowTC={unFollowHandler} name={u.name}
                                      smallImg={u.photos.small} disabled={disabled(u.id)}/>
                            )
                        })
                    }
                </div>

            </div>
            <div className={s.pagination}><Pagination size="large" count={pagesCount} page={props.currentPage}
                                                      onChange={props.onPageChanged}/></div>
        </div>
    );
};