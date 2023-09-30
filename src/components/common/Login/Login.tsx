import React, {FC} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Button, TextField} from '@mui/material';
import s from './Login.module.css'
import {useDispatch} from 'react-redux';
import {loginTC} from '../../../reducers/auth-reducer/auth-reducer';
import {Navigate} from 'react-router-dom';
import {useAppSelector} from '../../../redux/redux-store';
import container from '../styles/commonStyles.module.css'

export type FormValuesType = {
    email: string
    password: string
    // rememberMe: boolean
}

export const Login: FC<any> = () => {
    const dispatch: any = useDispatch()
    let isLogin = useAppSelector<any>(state => state.auth.isAuth)
    let captchaUrl = useAppSelector<any>(state => state.auth.captchaUrl)
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string()
                .required('Required')
                .min(4, 'Password must be at least 8 characters long')
        }),
        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm()
        },
    });

    if (isLogin) {
        return <Navigate to={'/profile'}/>
    }
    return (
        <div className={s.container}>
            <form onSubmit={formik.handleSubmit} className={s.form}>
                <div style={{width: '100%'}}>
                    <TextField sx={{margin: '20px 0', width: '100%'}} id="email" label="email" variant="outlined"
                               type="text"
                               {...formik.getFieldProps('email')} helperText={formik.errors.email}/>
                </div>
                <div style={{width: '100%'}}>
                    <TextField sx={{margin: '20px 0', width: '100%'}} id="password" label="password"
                               variant="outlined" type="password"
                               {...formik.getFieldProps('password')} helperText={formik.errors.password}/>
                </div>
                {captchaUrl && <img src={captchaUrl} alt=""/>}
                {captchaUrl &&   <div style={{width: '100%'}}>
                    <TextField sx={{margin: '20px 0', width: '100%'}} id="captcha" label="captcha"
                               variant="outlined" type="text"
                               {...formik.getFieldProps('captcha')} helperText={formik.errors.password}/>
                </div>}

                <div style={{width: '100%'}}>
                    <Button sx={{width: '100%'}} size="large" type="submit" variant="contained">Submit</Button>
                </div>
            </form>
        </div>
    );
};