import React, {FC} from 'react';
import {addMessageAC} from '../../reducers/dialogs-reducer/dialogs-reducer';
import {Dialogs} from './Dialogs';
import {connect} from 'react-redux';
import {compose, Dispatch} from 'redux';
import {witchAuthRedirect} from '../HOC/witchAuthRedirect/witchAuthRedirect';


let mapStateToProps = (state: any) => {
    return {
        dialogs: state.dialogsPage,
    }
}

let mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addNewMessage: (newMessage: string) => {
            dispatch(addMessageAC(newMessage))
        }
    }
}
export default compose(connect(mapStateToProps, mapDispatchToProps), witchAuthRedirect)(Dialogs)