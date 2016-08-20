import {
  LOAD_EDIT_VUE,
  SAISIE,
} from 'App/client/constants/actionTypes'

import update from 'immutability-helper'

export default function  vueReducer (state = {}, action) {
  switch (action.type) {

    case LOAD_EDIT_VUE :
      return loadEditVue(state,action.vue);

    case SAISIE :
      return saisie(state,action.saisie);

    default :
      return state;
  }
};



function loadEditVue(state, vue) {
  return {...state, ...vue} ;
}

function saisie(state,{_id, name, value}) {
/*
recuperer le chemin en découpant 'name' et en ajoutant _id
*/
let fields = name.split('.') ;
fields.unshift(_id) ;

const key = fields.splice(-1) ;
/*
update n'accepte qu'un objet en second parametre.
Pour transformer le resultat de path en objet, il doit se conformer strictment à la syntaxe JSON
*/
value = (typeof value === 'string') ? `"${value}"` : value ;

const path = JSON.parse(
  fields.reduceRight( (prec, current) => {
    return `{"${current}":${prec}}` ;
  },
  `{"${key}": { "$set": ${value}}}`)
) ;

 return update( state, path ) ;
}
