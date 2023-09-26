import {UserProfile} from '../reducers/profile-reducer/profile-reducer';

type FormikErrorType = {
    fullName?: string;
    aboutMe?: string;
    lookingForAJob?: boolean;
    lookingForAJobDescription?: string;
};

export const validate = (values: UserProfile): FormikErrorType => {
    const errors: FormikErrorType = {};

    if (!values.fullName) {
        errors.fullName = 'Обязательное поле';
    }

    if (!values.aboutMe) {
        errors.aboutMe = 'Обязательное поле';
    }


    return errors;
};