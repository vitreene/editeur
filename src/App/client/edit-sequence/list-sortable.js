import { Component, PropTypes } from 'react';
import Sortable from 'react-sortablejs';
//import { Glyphicon, Button } from 'react-bootstrap';
import {  Link } from 'react-router'

import './list-import'


const SortableList = (
  { items, onChange, onAdd, onToggle, onEeditVue }
) => {

    let sortable = null; // sortable instance

    const listItems = items.map( (item) => (
      <Vignette
        key={item._id}
        item={item}
        onToggle={onToggle}
        onEeditVue = {onEeditVue}
        />
    ) ) ;
    listItems.push( (
      <AjoutItem
        key="ajouterBtn"
        onAdd={onAdd}
        />
    ) );


    const options = {
      ghostClass: "list-dragged",
      chosenClass: "list-placeholder",
      dataIdAttr: 'data-id',
      animation: 300,
      delay: 150,
      filter:'.ignore',
      onMove : (evt) => {
        return evt.related.className.indexOf('ignore') === -1 ;
        }
    };

    return (
      <div>
        <Sortable
          className='list-vues'
          options={options}
          ref={(c) => { if (c) { sortable = c.sortable ;} } }
          tag="ul"
          onChange={(order) => { onChange(order) } }
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
       className="bg-circle list-ajouter-btn fa fa-plus"
       onClick= {onAdd}
       ></p>
     <p className="list-titre">Ajouter</p>
   </li>
  )
}

AjoutItem.propTypes = {
    onAdd: PropTypes.func
};


const Vignette = ({item, onToggle, onEeditVue}) => {

    const {_id,ordre,couleur, vignette, titre, visible} = item ;

    const bgImage = 'url('+require('App/ikono/'+vignette )+')' ;
    const estVisible = 'bg-circle ' +
     ( (visible) ? 'fa-eye-open' : 'fa-eye-close' );

    const getToggle = ()=>{ return onToggle(_id) } ;
    const getEditvue = ()=>{ return onEeditVue(_id) } ;

    return (
      <li
       data-id={_id}
        className='list-vue '
        style={ {backgroundColor:couleur} }
        >
        <div
          className="list-vignette"
          style={ {backgroundImage:bgImage} }
          onDoubleClick = {getEditvue}
          >
          <i className={estVisible}
            onClick={getToggle}
            />

        </div>
        <p className="list-titre">{titre}</p>
      </li>
    )
}

/*

*/

Vignette.propTypes = {
    item: PropTypes.object
};
