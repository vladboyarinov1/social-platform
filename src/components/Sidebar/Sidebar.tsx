import React, {FC} from 'react';
import s from './Sidebar.module.css'
import {ReactComponent as ProfileImg} from '../../img/icons/profile.svg';
import {ReactComponent as MessageImg} from '../../img/icons/messages.svg';
import {ReactComponent as NewsImg} from '../../img/icons/news.svg';
import {ReactComponent as SettingsImg} from '../../img/icons/settings.svg';
import {ReactComponent as UsersImg} from '../../img/icons/users.svg';
import {ReactComponent as Login} from '../../img/icons/login.svg';
import {NavLink} from 'react-router-dom';
import styled from 'styled-components';
import {useDispatch} from 'react-redux';
import {logoutTC} from '../../reducers/auth-reducer/auth-reducer';

type PropsType = {
    isAuth: boolean
    login: string
}

export const Sidebar: FC<PropsType> = ({isAuth, login}) => {
    const dispatch: any = useDispatch()



    const onClickButtonHandler = () => {
        dispatch(logoutTC())
    }
    return (
        <div className={s.wrapper}>
            <div className={s.sideNav}>
                <div className={s.links}>
                    <div><NavWrapper><NavLink to="/profile"><ProfileImg className={s.navIcons}/><p>Profile</p></NavLink></NavWrapper>
                        <NavWrapper><NavLink to="/dialogs"><MessageImg className={s.navIcons}/><p>Messages</p></NavLink></NavWrapper>
                        <NavWrapper><NavLink to="/users"><UsersImg className={s.navIcons}/><p>Users</p>
                        </NavLink></NavWrapper>
                        <NavWrapper><NavLink to="/news"><NewsImg className={s.navIcons}/><p>News</p>
                        </NavLink></NavWrapper>
                        {/*<li><Link to="/music"><MusicImg className={s.navIcons}/><p>Music</p></Link></li>*/}
                        <NavWrapper><NavLink to="/settings"><SettingsImg className={s.navIcons}/><p>Settings</p>
                        </NavLink></NavWrapper></div>
                    {isAuth ? <div onClick={onClickButtonHandler}><NavWrapper><NavLink to="/login"><Login className={s.navIcons}/><p>Login out</p>
                        </NavLink></NavWrapper></div> :
                        <div><NavWrapper><NavLink to="/login"><Login className={s.navIcons}/><p>Login</p>
                        </NavLink></NavWrapper></div>}
                </div>
            </div>
        </div>
    );
};

const NavWrapper = styled.div`
  padding: 0 0 15px 0;

  @media only screen and (max-width: 900px) {
    & a p {
      display: none;
    }
  }

  & a {
    color: white;
    text-decoration: none;
    padding: 10px 14px;
    display: flex;
    align-items: center;
  }

  & > a.active {
    text-decoration: none;
    color: #d32f2f;
  }

  & > a:hover {
    color: #999a9a;
  }

`

