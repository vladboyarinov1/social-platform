import React, {FC} from 'react';
import {ErrorMessage, Field, FieldProps} from 'formik';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import {UserProfile} from '../../../../../reducers/profile-reducer/profile-reducer';

type ContactItemType = {
    isEditing: boolean;
    initialValues: UserProfile;
    objectKeyName: keyof UserProfile;
    formik: any
};

export const ContactItem: FC<ContactItemType> = ({
                                                     isEditing,
                                                     initialValues,
                                                     objectKeyName,
                                                     formik
                                                 }) => {
    const isCheckbox = typeof initialValues[objectKeyName] === 'boolean';


    return (
        <div>
            <label htmlFor={objectKeyName}>${objectKeyName}: </label>
            {isEditing ? (
                <Field name={objectKeyName}>
                    {({ field }: FieldProps<UserProfile>) =>
                        isCheckbox ? (
                         <>
                             <Checkbox
                                 {...field}
                                 checked={field.value as unknown as boolean}
                                 id={objectKeyName}
                                 color="primary"
                             />

                         </>
                        ) : (
                            <TextField
                                {...field}
                                variant="standard"
                                error={formik.touched[objectKeyName] && !!formik.errors[objectKeyName]}
                                helperText={formik.touched[objectKeyName] && formik.errors[objectKeyName]}
                                // value={initialValues[objectKeyName] || ''}
                                type="text"
                                id={objectKeyName}
                            />
                        )
                    }
                </Field>
            ) : (
                <span>{isCheckbox ? (initialValues[objectKeyName] ? '✅' : '❌') : initialValues[objectKeyName] || '-'}</span>
            )}
            <ErrorMessage name={objectKeyName} component="div" />
        </div>
    );
};