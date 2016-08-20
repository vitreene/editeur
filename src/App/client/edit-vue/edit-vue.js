import { Component, PropTypes } from 'react'

import {
  Input,
  Checkbox,
  Radio,
} from 'rebass'

/*
faire passer le onchange par redux ;
copier les valeurs de initialstate vers "vakues" qui seront mutées.
en comparant, je peux crer pristine
touched est déclenché par onfocus ou onblur ?


*/


export default class EditVue extends Component {

  submit(){
    console.log('props (submit)', this.props);
    this.props.onSubmit() ;
  }
  render() {
// obsolete : usage de initialValues
    if (!this.props.initialValues)
      return (
        <h2> Chargement... </h2>
      )

    const {
      titre,
      description,
      prix,
    } = this.props.vue.source ;

    const {
      lien,
      position,
    } = this.props.vue.metas.source ;
    //console.log('PROPS', this.props);
    const {
      onSaisie,
     } = this.props ;

    return(
      <form
        onSubmit={this.submit}
        >
        <h1 >
          edition
        </h1>

         <Input
          name='source.titre'
          label='titre'
          type='text'
          value={titre || ''}
          onChange={onSaisie}
          />
          <Checkbox
            checked = {lien || ''}
            label="lier"
            name="metas.source.lien"
            theme="primary"
            onChange={onSaisie}
          />
          <Input
           name='source.description'
           label='description'
           type='text'
           value={description  || ''}
           onChange={onSaisie}
           />

         <Input
          name='source.prix'
          label='prix'
          type='number'
          step="0.01"
          value={prix  || '' }
          onChange={onSaisie}
          />
          <Radio
            name='metas.source.position'
            value='gauche'
            checked = {position == 'gauche'}
            onChange={onSaisie}
            label='Gauche'
            />
          <Radio
            name='metas.source.position'
            value='haut'
            checked = {position == 'haut'}
            onChange={onSaisie}
            label='Haut'
            />
          <Radio
            name='metas.source.position'
            value='droite'
            checked = {position == 'droite'}
            onChange={onSaisie}
            label='Droite'
            />
          <Radio
            name='metas.source.position'
            value='bas'
            checked = {position == 'bas'}
            onChange={onSaisie}
            label='Bas'
            />

      </form>
    )
  }
}
/*
_id,
titre,
ikono_id,
description,
offre,
prix,
prix_promo
*/
