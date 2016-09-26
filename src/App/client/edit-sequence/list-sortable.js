import { Component, PropTypes } from 'react';
import Sortable from 'react-sortablejs';
//import { Glyphicon, Button } from 'react-bootstrap';
import {  Link } from 'react-router'

import './list-import'


const SortableList = (
  { items, onChange, onAdd, onToggle, onEditVue }
) => {

    let sortable = null; // sortable instance

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

    const listItems = items.map( (item) => (
      <CardVue
        key={item.vue_id}
        item={item}
        onToggle={onToggle}
        onEditVue = {onEditVue}
        />
    ) ) ;

    if (items.length<12)

      listItems.push( (
        <AjoutItem
          key="ajouterBtn"
          onAdd={onAdd}
          />
      ) );

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


const CardVue = ({item, onToggle, onEditVue}) => {

    const {vue_id, ordre, titre, couleur, vignette, visible} = item ;

    const bgImage = `url( ${vignette} )` ;
    // const bgImage = 'url('+require('App/ikono/'+vignette )+')' ;
    const estVisible = 'bg-circle ' +
     ( (visible) ? 'fa-eye-open' : 'fa-eye-close' );

    const getToggle = ()=>{ return onToggle(vue_id) } ;
    const getEditvue = ()=>{ return onEditVue(vue_id) } ;

    return (
      <li
       data-id={vue_id}
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

CardVue.propTypes = {
    item: PropTypes.object
};
