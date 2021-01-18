import React from 'react';

import ItemDetails, { Record } from '../item-details';
import { swapiContextWrapper } from '../hoc-wrappers';


const PersonDetails = (props) => {
    return (
        <ItemDetails {...props} >
            <Record field="gender" label="Gender" />
            <Record field="eyeColor" label="Eye Color" />
        </ItemDetails>
    );
};

const mapMethodsToProps = (swapiService) => {
    return {
        getDataFunc: swapiService.getPerson,
        getImageUrlFunc: swapiService.getPersonImage
    }
};

export default swapiContextWrapper(mapMethodsToProps)(PersonDetails)
