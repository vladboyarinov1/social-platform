import React from 'react';
import {addPostAC} from '../../../reducers/profile-reducer/profile-reducer';
import {MyPosts} from './MyPosts';
import {connect} from 'react-redux';

let mapStateToProps = (state: any) => {


    return {
        posts: state.profilePage
    }
}

let mapDispatchToProps = (dispatch: any) => {
    return {
        addPosts: (newPostText: string) => {
            dispatch(addPostAC(newPostText))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPosts)
