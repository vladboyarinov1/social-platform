import React, {FC, useState} from 'react';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import {Field, FieldProps, Form, Formik} from 'formik';
import {UserProfile} from '../../../../reducers/profile-reducer/profile-reducer';


type PropsType = {
    initialValues: UserProfile;
    onSubmit: (values: UserProfile) => void;
};

export const ProfileUserData: FC<PropsType> = ({ initialValues, onSubmit }) => {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <Grid container display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Grid item justifyContent={'center'} paddingTop="100px">
                <Formik<UserProfile>
                    initialValues={initialValues}
                    onSubmit={(values, { setSubmitting }) => {
                        onSubmit(values);
                        setSubmitting(false);
                        setIsEditing(false);
                    }}
                >
                    {formik => (
                        <Form>
                            <FormControl>
                                <FormGroup>
                                    <div>
                                        <label htmlFor="fullName">First Name</label>
                                        {isEditing ? (
                                            <Field
                                                as={TextField}
                                                defaultValue={initialValues.fullName}
                                                type="text"
                                                id="fullName"
                                                name="fullName"
                                            />
                                        ) : (
                                            <span>{initialValues.fullName}</span>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="aboutMe">aboutMe: </label>
                                        {isEditing ? (
                                            <Field
                                                as={TextField}
                                                defaultValue={initialValues.aboutMe}
                                                type="text"
                                                id="aboutMe"
                                                name="aboutMe"
                                            />
                                        ) : (
                                            <span>{initialValues.aboutMe || '-'}</span>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="lookingForAJob">lookingForAJob: </label>
                                        {isEditing ? (
                                            <Field name="lookingForAJob">
                                                {({ field }: FieldProps<UserProfile>) => (
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
                                    </div>

                                    <div>
                                        <label htmlFor="lookingForAJobDescription">lookingForAJobDescription: </label>
                                        {isEditing ? (
                                            <Field
                                                as={TextField}
                                                defaultValue={initialValues.lookingForAJobDescription || ''}
                                                type="text"
                                                id="lookingForAJobDescription"
                                                name="lookingForAJobDescription"
                                            />
                                        ) : (
                                            <span>{initialValues.lookingForAJobDescription || '-'}</span>
                                        )}
                                    </div>
                                    {Object.entries(initialValues.contacts).map(([key, value]) => (
                                        <div key={key}>
                                            <label htmlFor={key}>{key}:</label>
                                            {isEditing ? (
                                                <TextField variant={'standard'} type="text" name={`contacts.${key}`} id={key}/>
                                            ) : (
                                                <span>{value || 'нет данных'}</span>
                                            )}
                                        </div>
                                    ))}
                                    <div>
                                        <button
                                            type="button"
                                            onClick={() => setIsEditing(!isEditing)}
                                            disabled={formik.isSubmitting}
                                        >
                                            {isEditing ? 'Отменить' : 'Изменить'}
                                        </button>
                                        {isEditing && (
                                            <button type="submit" disabled={formik.isSubmitting}>
                                                Сохранить
                                            </button>
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