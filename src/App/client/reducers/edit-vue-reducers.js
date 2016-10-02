import {
  LOAD_EDIT_VUE,
  SAISIE,
  IMPORT_IMG,
  UPDATE_METAS_IKONO,
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

    case UPDATE_METAS_IKONO :
      return updateMetasIkono(state, action.vue_id, action.transform);

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

function importIMG(state,{vue_id, img_id, preview }) {
  /*
  vue_id, // id de la vue,
  img_ID, // ajouter à source
  preview // à part, variable locale
  */

  let vue = state[vue_id] ;
  vue.source.ikono_id = img_id ;
  vue.ikono._id = img_id ;
  vue.ikono.preview = preview.src ;
  return {...state, [vue_id]:{...vue} }
}

function updateMetasIkono(state, vue_id, transform) {
  // mettre a jour metas.ikono avec transform
  /*
    zone:null
    placement:null
    pristine:null
    pox:null
    poy:null
    rot:null
    ech:null
    pivX:null
    pivY:null
  */
// chercher l'index correspondant à zone ;
const found = state[vue_id].metas.ikono.map((x)=>x.zone ).indexOf( transform.zone );
// mettre à jour
console.log('update ikono', found, {[vue_id] : {
  metas : {
    ikono : {
      [found] : {transform }
    }
  }
}}
);

if (-1 < found )
  return update( state, {
    [vue_id] : {
      metas : {
        ikono : {
          [found] : {$set: transform }
        }
      }
    }
  });

else
  return update( state, {
    [vue_id] : {
      metas : {
        ikono :  {$push: [transform] }
      }
    }
  });



}
