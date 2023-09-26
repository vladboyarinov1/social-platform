import React, { FC } from 'react';
import { ErrorMessage, Field, FieldProps, FormikValues } from 'formik';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { UserProfile } from '../../../../../reducers/profile-reducer/profile-reducer';

type ContactItemType = {
    isEditing: boolean;
    initialValues: UserProfile;
    objectKeyName: keyof UserProfile;
};

export const ContactItem: FC<ContactItemType> = ({
                                                     isEditing,
                                                     initialValues,
                                                     objectKeyName,
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
                                defaultValue={initialValues[objectKeyName] || ''}
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