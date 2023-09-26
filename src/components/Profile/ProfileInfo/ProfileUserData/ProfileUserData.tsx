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
                                    <div>
                                        <label htmlFor="fullName">First Name</label>
                                        {isEditing ? (
                                            <Field variant={'standard'}
                                                   as={TextField}
                                                   defaultValue={initialValues.fullName}
                                                   type="text"
                                                   id="fullName"
                                                   name="fullName"
                                            />
                                        ) : (
                                            <span>{initialValues.fullName}</span>
                                        )}
                                        <ErrorMessage name="fullName" component="div"/>
                                    </div>

                                    <div>
                                        <label htmlFor="aboutMe">aboutMe: </label>
                                        {isEditing ? (
                                            <Field variant={'standard'}
                                                   as={TextField}
                                                   defaultValue={initialValues.aboutMe}
                                                   type="text"
                                                   id="aboutMe"
                                                   name="aboutMe"
                                            />
                                        ) : (
                                            <span>{initialValues.aboutMe || '-'}</span>
                                        )}
                                        <ErrorMessage name="aboutMe" component="div"/>
                                    </div>

                                    <div>
                                        <label htmlFor="lookingForAJob">lookingForAJob: </label>
                                        {isEditing ? (
                                            <Field variant={'standard'} name="lookingForAJob">
                                                {({field}: FieldProps<UserProfile>) => (
                                                    <Checkbox
                                                        {...field}
                                                        checked={formik.values.lookingForAJob}
                                                        id="lookingForAJob"
                                                    />
                                                )}
                                            </Field>
                                        ) : (
                                            <span>{initialValues.lookingForAJob ? '✅' : '❌'}</span>
                                        )}
                                        <ErrorMessage name="lookingForAJob" component="div"/>
                                    </div>

                                    <div>
                                        <label htmlFor="lookingForAJobDescription">lookingForAJobDescription: </label>
                                        {isEditing ? (
                                            <Field variant={'standard'}
                                                   as={TextField}
                                                   defaultValue={initialValues.lookingForAJobDescription || ''}
                                                   type="text"
                                                   id="lookingForAJobDescription"
                                                   name="lookingForAJobDescription"
                                            />
                                        ) : (
                                            <span>{initialValues.lookingForAJobDescription || '-'}</span>
                                        )}
                                        <ErrorMessage name="lookingForAJobDescription" component="div"/>
                                    </div>
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