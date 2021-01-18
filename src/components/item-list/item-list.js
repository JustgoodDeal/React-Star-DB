import React from 'react';
import PropTypes from "prop-types";

import './item-list.css';


const ItemList = (props) => {

    const { itemsList, itemSelectedFunc, children: renderLabelFunc } = props;

    const items = itemsList.map((item) => {
        const { id } = item;
        const label = renderLabelFunc(item);

        return (
            <li className="list-group-item"
                key={id}
                onClick={() => itemSelectedFunc(id)}>
                {label}
            </li>
        );
    });

    return (
        <ul className="item-list list-group">
            {items}
        </ul>
    );
};

ItemList.defaultProps = {
    itemSelectedFunc: () => {}
};

ItemList.propTypes = {
    itemSelectedFunc: PropTypes.func,
    itemsList: PropTypes.arrayOf(PropTypes.object).isRequired,
    children: PropTypes.func.isRequired
};

export default ItemList;
