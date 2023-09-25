import React, {FC} from 'react';
import {LinearProgress} from '@mui/material';

type PropsType = {
    isFetching: boolean
}

export const Preloader: FC<PropsType> = ({isFetching}) => {
    return (
        <>
            {isFetching && <LinearProgress style={{margin: '5px'}}/>}
        </>
    );
};