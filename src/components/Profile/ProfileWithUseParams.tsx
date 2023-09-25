import ProfileContainer from './ProfileContainer';
import {useAppSelector} from '../../redux/redux-store';
import {useParams} from 'react-router-dom';

export function ProfileWithUseParams() {
    let {id} = useParams();
    let profileId = useAppSelector(state => state.auth.id);

    if (!id) {
        id = profileId?.toString() || '';
    }

    return <ProfileContainer id={Number(id)}/>;
}