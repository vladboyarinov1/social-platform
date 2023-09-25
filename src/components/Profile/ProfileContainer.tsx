import React from 'react';
import {connect} from 'react-redux';
import {
    getUserProfile,
    setUserProfile,
    setUserStatusTC, updateProfileDataTC,
    updateStatusTC
} from '../../reducers/profile-reducer/profile-reducer';
import {Profile} from './Profile';
import {witchAuthRedirect} from '../HOC/witchAuthRedirect/witchAuthRedirect';
import {compose} from 'redux';

class ProfileContainer extends React.Component<any> {

    componentDidMount() {
        this.props.getUserProfile(this.props.id)
        this.props.setUserStatusTC(this.props.id)
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<{}>, snapshot?: any) {
        if (prevProps.status !== this.props.status) {
            this.setState(({
                status: this.props.status
            }))
        }
    }


    render() {
        return (
            <>
                <Profile updateProfileDataTC={this.props.updateProfileDataTC} profile={this.props.profile} posts={this.props.posts} status={this.props.status}
                         updateStatus={this.props.updateStatusTC}/>
            </>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status
    }
}

export default compose(connect(mapStateToProps, {
    setUserProfile,
    getUserProfile,
    setUserStatusTC,
    updateStatusTC,
    updateProfileDataTC
}), witchAuthRedirect)(ProfileContainer)
