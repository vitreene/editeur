import React, { Component, PropTypes } from 'react';

import Sortable from 'react-sortablejs';

import './list-import'



// Functional Component
const SortableList = ({ items, onChange, onAdd }) => {

    let sortable = null; // sortable instance
    const listItems = items.map( (vu) => (
      <ListItem key={vu._id} item={vu}/>
    ) ) ;
    listItems.push((
      <AjoutItem key="ajouter" onAdd={onAdd}/>
    ));

    console.log('listItems', listItems );

    const options = {
      ghostClass: "list-dragged",
      chosenClass: "list-placeholder",
      dataIdAttr: 'data-id',
      animation: 150,
      filter:'.ignore',
      onMove : (evt) => {
        return evt.related.className.indexOf('ignore') === -1 ;
        }
      }
    return (
      <div>
        <Sortable
          className='list-vues'
          options={options}
          ref={(c) => { if (c) { sortable = c.sortable ;} } }
          tag="ul"
          onChange={(order, sortable, evt) => {
            console.log(sortable);
              onChange(order,sortable);
          }}
        >
            {listItems}
        </Sortable>
      </div>
    );
};


SortableList.propTypes = {
    items: PropTypes.array,
    onChange: PropTypes.func,
    onAdd: PropTypes.func
};

export default SortableList;


const AjoutItem = ({onAdd}) => {
  return(
    <li
       data-id='ajouterBtn'
       className='list-vue list-ajouter ignore'
     >
     <p
       className="list-ajouter-btn"
       onClick= {onAdd}
       > + </p>
     <p className="list-titre">Ajouter</p>
   </li>
  )
}

AjoutItem.propTypes = {
    onAdd: PropTypes.func
};


const ListItem = ({item}) => {
    const {_id,ordre,couleur, vignette, titre} = item ;
    return (
      <li
       data-id={_id}
        className='list-vue '
        style={ {backgroundColor:couleur} }
      >
        <div className="list-vignette"
          style={{backgroundImage:'url('+require('App/ikono/'+vignette )+')'}}
        >
        </div>
        <p className="list-titre">{titre}</p>
      </li>
    )
}

ListItem.propTypes = {
    item: PropTypes.object
};
