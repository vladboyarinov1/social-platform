import {UserType} from '../reducers/users-reducer/users-reducer';

export const updateObjInArray = (
    items: UserType[],
    itemId: number,
    objPropName: keyof UserType,
    newObjProps: { followed: boolean }
) => {
    return items.map(u => (u[objPropName] === itemId ? {...u, ...newObjProps} : u));
};