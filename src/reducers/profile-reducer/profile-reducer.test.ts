import {
    profileReducer,
    addPostAC,
    setUserProfile,
    setStatus,
    updateStatus,
} from './profile-reducer';
import {ProfilePageType} from '../../store';

let initialState: ProfilePageType;
beforeEach(() => {
    initialState = {
        profile: null,
        posts: [],
        status: null,
    };
});

test('should add a new post', () => {
    const action = addPostAC('New post');
    const newState = profileReducer(initialState, action);

    expect(newState.posts.length).toBe(1);
    expect(newState?.posts[0]?.message).toBe('New post');
});
test('should set user profile', () => {
    const userProfile = {
        aboutMe: 'About me',
        contacts: {
            facebook: null,
            website: null,
            vk: null,
            twitter: null,
            instagram: null,
            youtube: null,
            github: null,
            mainLink: null,
        },
        lookingForAJob: false,
        lookingForAJobDescription: null,
        fullName: 'John Doe',
        userId: 123,
        photos: {
            small: '',
            large: '',
        },
    };

    const action = setUserProfile(userProfile);
    const newState = profileReducer(initialState, action);

    expect(newState.profile).toEqual(userProfile);
});
test('should set user status', () => {
    const action = setStatus('Online');
    const newState = profileReducer(initialState, action);

    expect(newState.status).toBe('Online');
});
test('should update user status', () => {
    initialState.status = 'Online';

    const action = updateStatus('Offline');
    const newState = profileReducer(initialState, action);

    expect(newState.status).toBe('Offline');
});