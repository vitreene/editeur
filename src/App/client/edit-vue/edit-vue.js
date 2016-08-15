import { Component, PropTypes } from 'react'
import {Input} from 'rebass'

/*
faire passer le onchange par redux ;
copier les valeurs de initialstate vers "vakues" qui seront mutées.
en comparant, je peux crer pristine
touched est déclenché par onfocus ou onblur ?


*/

export default class EditVue extends Component {

// getvue est pour le conteneur !!
/*
  componentWillMount() {
    // charger les sources
    const {getVue, _id } = this.props ;
    getVue(_id);
  }
*/
  submit(){
    console.log('props (submit)', this.props);
    this.props.onSubmit() ;
  }
  render() {
    console.log('initialValues',this.props.initialValues);
    if (!this.props.initialValues)
      return (
        <h2> Chargement... </h2>
      )

    const {
      titre,
      description,
      prix,
    } = this.props.initialValues ;

    //console.log('PROPS', this.props);
    //const { handleSubmit } = this.props ;

    const { onSaisie } = this.props ;

    return(
      <form
        onSubmit={this.submit}
        >
        <h1 >
          edition
        </h1>

         <Input
          name='titre'
          label='titre'
          type='text'
          value={titre}
          onChange={onSaisie}
          />

          <Input
           name='description'
           label='description'
           type='text'
           value={description}
           onChange={onSaisie}
           />

         <Input
          name='prix'
          label='prix'
          type='number'
          value={prix}
          onChange={onSaisie}
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
