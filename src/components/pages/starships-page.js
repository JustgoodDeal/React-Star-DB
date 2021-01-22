import React from 'react';
import { WrappedStarshipList } from '../swapi-components';
import { withRouter } from "react-router-dom";


const StarshipsPage = ({ history }) => {
    return (
        <WrappedStarshipList
            itemSelectedFunc={(itemId) => history.push(itemId)} />
    );
};

export default withRouter(StarshipsPage)
