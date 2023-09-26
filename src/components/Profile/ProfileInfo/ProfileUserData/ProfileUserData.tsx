import React, {FC, useState} from 'react';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import {ErrorMessage, Field, FieldProps, Form, Formik} from 'formik';
import {UserProfile} from '../../../../reducers/profile-reducer/profile-reducer';
import {Button} from '@mui/material';
import {validate} from '../../../../utils/validate';
import {ContactItem} from './ContactItem/ContactItem';


type PropsType = {
    initialValues: UserProfile;
    onSubmit: (values: UserProfile) => void;
};

export const ProfileUserData: FC<PropsType> = ({initialValues, onSubmit}) => {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <Grid container display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Grid item justifyContent={'center'} paddingTop="100px">
                <Formik<UserProfile>
                    initialValues={initialValues}
                    onSubmit={(values, {setSubmitting}) => {
                        onSubmit(values);
                        setSubmitting(false);
                        setIsEditing(false);
                    }}
                    validate={validate}
                >
                    {formik => (
                        <Form>
                            <FormControl>
                                <FormGroup>
                                    <ContactItem initialValues={initialValues} isEditing={isEditing}
                                                 objectKeyName={'fullName'}/>
                                    <ContactItem initialValues={initialValues} isEditing={isEditing}
                                                 objectKeyName={'aboutMe'}/>
                                    <ContactItem initialValues={initialValues} isEditing={isEditing}
                                                 objectKeyName={'lookingForAJob'}/>
                                    <ContactItem initialValues={initialValues} isEditing={isEditing}
                                                 objectKeyName={'lookingForAJobDescription'}/>

                                    {Object.entries(initialValues.contacts).map(([key, value]) => (
                                        <div key={key}>
                                            <label htmlFor={key}>{key}:</label>
                                            {isEditing ? (
                                                <TextField variant={'standard'} type="text" name={`contacts.${key}`}
                                                           id={key}/>
                                            ) : (
                                                <span>{value || 'нет данных'}</span>
                                            )}
                                        </div>
                                    ))}
                                    <div>
                                        <Button
                                            type="button"
                                            onClick={() => setIsEditing(!isEditing)}
                                            disabled={formik.isSubmitting}
                                        >
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
                </Formik>
            </Grid>
        </Grid>
    );
};