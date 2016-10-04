import { Component, PropTypes } from 'react'
import { connect }  from 'react-redux-meteor'
//import { bindActionCreators} from 'redux'
import {
  Toolbar,
  NavItem,
  Space,
  Footer,
} from 'rebass'
import { Link } from 'react-router'

import getVue from 'App/client/actions/init-edit-vue'
import {saveVue, saisie} from 'App/client/actions/edit-vue-actions'

import {uploadFile} from 'App/client/actions/edit-image-actions'

import EditVue from 'App/client/edit-vue/edit-vue'
import EditImage from 'App/client/edit-vue/edit-image'


/*
EditVueContainer est le conteneur des trois parties de l'éditeur.
il charge les données et les dispatche dans les parties.
-> des données sont aussi transmises à la zone "options"

ATTENTION : erreur si rechargement de la page : les données sont effacées !
Cannot read property 'source_id'
*/

class EditVueContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onSaisie = this.onSaisie.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.upload = this.upload.bind(this) ;
  }

  componentWillMount() {
    console.log('EDIT VUE PROPS',  this.props );
    // charger les sources si pas en cache
    const {getVue, vue_id, vue, dispatch } = this.props ;
    if(!vue)
      getVue(dispatch, vue_id);
  }

  upload(){
      // transform est destiné à proxy, je n'en ai pas besoin ici ?
      const transform = {
        pox :  0,
        poy :  0,
        rot :  0,
        ech :  1,
        pivX : false,
        pivY : false,

        pristine : false, // true,
        zone:  'ecran01',
        placement: "libre"
      };

    const {vignette,  uploadFile, dispatch} = this.props ;
    uploadFile(dispatch,vignette, transform) ;
  }

  onSaisie(e){
    
  //  e.preventDefault() ;
    const {saisie, vue_id ,dispatch} = this.props ;
    const {name, type} = e.target ;

    const filter = {
      checkbox: e.target.checked,
      number: Number(e.target.value),
      text : e.target.value,
      radio : e.target.value
    } ;
    const value = filter[type] ;

    saisie(dispatch, vue_id, name, value) ;
  }

  onClick(e){
    e.preventDefault() ;
    this.refs['editvue'].submit() ;

  }
  onSubmit(){

    // si submit un formulaire vide -> erreur !
    // formulaire vide = annuler.
    // utiliser une valeur "pristine"

    const {dispatch, vue_id, vue, saveVue, vignette, params:{sequence_id} } = this.props ;

    const path = '/sequence/'+sequence_id ;
    const callback = ()=>this.context.router.push(path) ;

    saveVue(dispatch, sequence_id, vue, vignette, callback ) ;

    console.log('--> SUBMIT') ;
  }

  render() {
    console.log('--PROPS', this.props );
    if (!this.props.vue)
      return(<h1> Chargement…</h1>) ;

    const {
      _id,
      vue:{ikono, metas},
      params:{sequence_id}
    } = this.props ;

    const zone='ecran01' ;

      return (
        <div>
        <EditVueTop
          onClick = {this.onClick}
          sequence_id = {sequence_id}
        />
        <EditVue
          ref={'editvue'}
          onSubmit={this.onSubmit}
          onSaisie={this.onSaisie}
          {...this.props}
          />
        <EditImage
          zone={zone}
          _id= {_id}
          ikono={ikono}
          metasIkono={metas.ikono}
          upload = {this.upload}
          onSaisie={this.onSaisie}
          />
        <EditVueBottom />
        </div>
      )
    }

}
EditVueContainer.contextTypes = {
  router: PropTypes.object
}
EditVueContainer.propTypes = {
}

function mapStateToProps(state,ownProps) {
  // la vue est en cache dans state
  // en cas de reload, on perd le contenu.
  // à mettre en localstate ?
  const vue_id = ownProps.params.vue_id ;
  const vue = state.vue[vue_id] ;
  const vignette = state.vignettes.find(
    x=> x.vue_id === vue_id
  ) ;
  const init = vue ? vue.source : undefined ;
/*
initialValues doit garder intactes les valeurs de départ, à partir desquelles les values sont copiées pour etre appliquées au formulaire.
cependant, sa toute première valeur sera 'vide', cette variable doit etre intitialisée au résultat de getEdit, (ou avec un statut loaded)
*/
  return {
    vue_id,
    vue,
    vignette,
    initialValues: init,

    }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getVue,
    saveVue,
    saisie,
    uploadFile
    //bindActionCreators({saisie},dispatch)
  }
}

export default connect(
  null,
  mapStateToProps,
  mapDispatchToProps
)(EditVueContainer) ;


////////////////////////////////////
// barres d'etat provisoires
const EditVueTop = ({onClick, sequence_id}) =>{
  return(
    <Toolbar>
      <Link to={"/sequence/"+sequence_id}>retour</Link>
      <Space  auto  x={1} />
      <NavItem onClick={onClick} >
        PUBLIER
      </NavItem>
    </Toolbar>
   )
}
EditVueTop.propTypes = {};

const EditVueBottom = () => {
  return(<Footer> fond </Footer> )
}
EditVueBottom.propTypes = {};
