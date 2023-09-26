import React, {FC, useState, ReactNode, useEffect} from 'react';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import {Form, Formik} from 'formik';
import {UserProfile} from '../../../../reducers/profile-reducer/profile-reducer';
import {Button} from '@mui/material';
import {validate} from '../../../../utils/validate';
import {ContactItem} from './ContactItem/ContactItem';


type PropsType = {
    initialValues: UserProfile | null;
    onSubmit: (values: UserProfile) => void;
};

export const ProfileUserData: FC<PropsType> = ({initialValues, onSubmit}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState<UserProfile | null>(null);

    useEffect(() => {
        if (initialValues) {
            setUserData(initialValues);
            setLoading(false);
        }
    }, [initialValues]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleFormSubmit = async (values: UserProfile) => {
        onSubmit(values);
        setIsEditing(false);
    };
//async (values, {setSubmitting}) => {
//                         onSubmit(values);
//                         setSubmitting(false);
//                         setIsEditing(false);
//                     }
    return (
        <Grid container>
            <Grid item paddingTop="10px">
                {userData && (<Formik<UserProfile>
                    initialValues={userData}
                    onSubmit={handleFormSubmit}
                    validate={validate}
                >
                    {formik => (

                        <Form>
                            <FormControl>
                                <FormGroup>
                                    <ContactItem initialValues={userData} isEditing={isEditing}
                                                 objectKeyName={'fullName'} formik={formik}/>
                                    <ContactItem initialValues={userData} isEditing={isEditing}
                                                 objectKeyName={'aboutMe'} formik={formik}/>
                                    <ContactItem initialValues={userData} isEditing={isEditing}
                                                 objectKeyName={'lookingForAJobDescription'} formik={formik}/>
                                    <ContactItem initialValues={userData} isEditing={isEditing}
                                                 objectKeyName={'lookingForAJob'} formik={formik}/>

                                    {Object.entries(userData.contacts).map(([key, value]) => (
                                        <div key={key}>
                                            <label htmlFor={key}>{key}:</label>
                                            {isEditing ? (
                                                <TextField variant="standard" type="text"
                                                           id={key}
                                                           {...formik.getFieldProps(`contacts['${key}']`)}/>
                                            ) : (
                                                <span>{value || 'нет данных'}</span>
                                            )}
                                        </div>
                                    ))}

                                    <div>
                                        <Button type="button" onClick={() => setIsEditing(!isEditing)}
                                                disabled={formik.isSubmitting}>
                                            {isEditing ? 'Отменить' : 'Изменить'}
                                        </Button>
                                        {isEditing && (
                                            <Button variant={'outlined'} type="submit" disabled={formik.isSubmitting}>
                                                Сохранить
                                            </Button>
                                        )}
                                    </div>
                                </FormGroup>
                            </FormControl>
                        </Form>
                    )}
                </Formik>)}
            </Grid>
        </Grid>
    );
};