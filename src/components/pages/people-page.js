import React from 'react';
import { withRouter } from "react-router-dom";
import { WrappedPersonDetails, WrappedPersonList } from '../swapi-components';
import Row from '../row';


const PeoplePage = ({ history, match }) => {

    const { id } = match.params;

    return (
      <Row
        left={<WrappedPersonList
            itemSelectedFunc={(id) => history.push(id)} />}
        right={<WrappedPersonDetails itemId={id} />} />
    );
};

export default withRouter(PeoplePage)
