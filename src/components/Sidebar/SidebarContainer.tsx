import React from 'react';
import {Sidebar} from './Sidebar';
import {connect} from 'react-redux';
import {setAuthUserTC} from '../../reducers/auth-reducer/auth-reducer';


class SidebarContainer extends React.Component<any> {

    componentDidMount() {
        this.props.setAuthUserTC()

    }

    render() {
        return (
            <Sidebar {...this.props} isAuth={this.props.auth.isAuth} login={this.props.auth.login}/>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        auth: state.auth
    }
}
// const mapDispatchToProps = (dispatch: Dispatch) => {
//     return {
//         setAuthUserData: (data: any) => {
//             dispatch(setAuthUserData(data))
//         }
//     }
// }

export default connect(mapStateToProps, {setAuthUserTC})(SidebarContainer)