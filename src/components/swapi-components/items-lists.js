import React from 'react';
import ItemList from '../item-list';
import { itemListWrapper as iLwrapper } from '../hoc-wrappers';


const addChildWrapper = (Wrapped, renderFunc) => {
  return (props) => {
    return (
        <Wrapped {...props}>
          {renderFunc}
        </Wrapped>
    )
  };
};

const renderName = ({ name }) => <span>{name}</span>;
const renderModelAndName = ({ model, name}) => <span>{name} ({model})</span>;


const WrappedPersonList = iLwrapper(
                            addChildWrapper(ItemList, renderName),
                'getAllPeople');

const WrappedPlanetList = iLwrapper(
                          addChildWrapper(ItemList, renderName),
                'getAllPlanets');

const WrappedStarshipList = iLwrapper(
                            addChildWrapper(ItemList, renderModelAndName),
                  'getAllStarships');


export {
  WrappedPersonList,
  WrappedPlanetList,
  WrappedStarshipList
};
