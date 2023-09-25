import React from 'react';
import {connect} from 'react-redux';
import {
    followTC, setDisabled,
    setUsersTC,
    unFollowTC, UsersPageType,
} from '../../reducers/users-reducer/users-reducer';
import {Users} from './Users';
import {witchAuthRedirect} from '../HOC/witchAuthRedirect/witchAuthRedirect';
import {compose} from 'redux';

export interface UsersProps extends UsersPageType {
    followTC: (userId: number) => void
    unFollowTC: (userId: number) => void
    setUsersTC: (currentPage: number, pageSize: number) => void
    setDisabled: (userId: number, isFetching: boolean) => void

}

export class UsersContainer extends React.Component<UsersProps, UsersProps> {

    componentDidMount() {
        this.props.setUsersTC(this.props.currentPage, this.props.pageSize)
    }


    onPageChanged = (event: React.ChangeEvent<unknown>, pageNumber: number) => {
        this.props.setUsersTC(pageNumber, this.props.pageSize)
    }


    render() {
        return (
            <Users items={this.props.items} totalUserCount={this.props.totalCount}
                   onPageChanged={this.onPageChanged} currentPage={this.props.currentPage}
                   pageSize={this.props.pageSize} followTC={this.props.followTC} unFollowTC={this.props.unFollowTC}
                   isFetching={this.props.isFetching} setDisable={this.props.setDisabled}
                   followingInProgress={this.props.followingInProgress}/>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        items: state.usersPage.items,
        pageSize: state.usersPage.pageSize,
        totalCount: state.usersPage.totalCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
    }
}

export default compose(connect(mapStateToProps, {
    followTC,
    unFollowTC,
    setUsersTC,
    setDisabled
}), witchAuthRedirect)(UsersContainer)


// const mapDispatchToProps = (dispatch: Dispatch) => {
//     return {
//         follow: (userId: number) => {
//             dispatch(followAC(userId))
//         },
//         unfollow: (userId: number) => {
//             dispatch(unFollowAC(userId))
//         },
//         setUsers: (users: UserType[]) => {
//             dispatch(setUsersAC(users))
//         },
//.......
//     }
// }