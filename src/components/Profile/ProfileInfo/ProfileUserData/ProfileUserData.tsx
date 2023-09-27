import React, {FC, useState, ReactNode, useEffect} from 'react';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import {Form, Formik} from 'formik';
import {UserProfile} from '../../../../reducers/profile-reducer/profile-reducer';
import {Button, Collapse, List, ListItemButton, ListItemText} from '@mui/material';
import {validate} from '../../../../utils/validate';
import {ContactItem, Label, WrapperContact} from './ContactItem/ContactItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import LinkIcon from '@mui/icons-material/Link';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';


type PropsType = {
    initialValues: UserProfile | null;
    onSubmit: (values: UserProfile) => void;
    isOwnProfile: boolean
};

export const ProfileUserData: FC<PropsType> = ({initialValues, onSubmit, isOwnProfile}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState<UserProfile | null>(null);
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

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

    return (
        <Grid container>
            <Grid item paddingTop="10px">
                {userData && (<Formik<UserProfile>
                    initialValues={userData}
                    onSubmit={handleFormSubmit}
                    validate={validate}>
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


                                    <ListItemButton onClick={handleClick}>
                                        <ListItemIcon>
                                            <LinkIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary="Other links"/>
                                        {open ? <ExpandLess/> : <ExpandMore/>}
                                    </ListItemButton>
                                    <Collapse in={open} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            {userData && typeof userData.contacts === 'object' ? (
                                                Object.entries(userData.contacts).map(([key, value]) => (
                                                    <WrapperContact key={key} >
                                                        <Label htmlFor={key}>{key}:</Label>
                                                        {isEditing ? (
                                                            <TextField variant="standard" type="text"
                                                                       id={key} {...formik.getFieldProps(`contacts['${key}']`)}/>
                                                        ) : (
                                                            <span>{value || '-'}</span>
                                                        )}
                                                    </WrapperContact>
                                                ))
                                            ) : (
                                                <div>Нет данных о контактах</div>
                                            )}
                                        </List>
                                    </Collapse>
                                    {
                                        isOwnProfile && <div style={{padding: '10px 10px'}}>
                                            <Button style={{marginRight: '10px'}}  type="button" onClick={() => setIsEditing(!isEditing)}
                                                    disabled={formik.isSubmitting} variant='outlined'>
                                                {isEditing ? 'Отменить' : 'Изменить'}
                                            </Button>
                                            {isEditing && (
                                                <Button variant='contained' type="submit" disabled={formik.isSubmitting}>
                                                    Сохранить
                                                </Button>
                                            )}
                                        </div>
                                    }
                                </FormGroup>
                            </FormControl>
                        </Form>
                    )}
                </Formik>)}
            </Grid>
        </Grid>
    );
};