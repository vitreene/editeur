import {
  LOAD_EDIT_VUE,
  SAISIE,
  IMPORT_IMG,
} from 'App/client/constants/actionTypes'

import update from 'immutability-helper'

export default function  vueReducer (state = {}, action) {
  switch (action.type) {

    case LOAD_EDIT_VUE :
      return loadEditVue(state,action.vue);

    case SAISIE :
      return saisie(state,action.saisie);

    case IMPORT_IMG :
      return importIMG(state,action.img);

    default :
      return state;
  }
};



function loadEditVue(state, vue) {

//  console.log('loadEditVue', vue);

  return {...state, ...vue} ;
}

function saisie(state,{vue_id, name, value}) {
  /*
    recuperer le chemin en découpant 'name' et en ajoutant _id
  */
  let fields = name.split('.') ;
  fields.unshift(vue_id) ;

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

function importIMG(state,{vue_id, img_ID, preview }) {
  /*
  vue_id, // id de la vue,
  img_ID, // ajouter à source
  preview // à part, variable locale
  */

  let vue = state[vue_id] ;
  vue.source.ikono_id = img_ID ;
  vue.ikono._id = img_ID ;
  vue.ikono.preview = preview.src ;
  return {...state, [vue_id]:{...vue} }
}
