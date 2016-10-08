import { Component, PropTypes } from 'react'
import {
  Radio,
  Select,
  Button
} from 'rebass'
import { Flex } from 'reflexbox'


export default class EditImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectZoneNom:props.zone,
      // attribuer index selon zone
      selectZone: 0
    } ;
    this.getSelectZone = this.getSelectZone.bind(this);
    this.onSelectZone = this.onSelectZone.bind(this);
    this.onRadio = this.onRadio.bind(this);
  }

  componentWillMount(){
      const {zone, metasIkono } = this.props ;
      const index = metasIkono.findIndex(
        (el, i) => (el.zone === zone)
      );

      console.log('  selectZone: ', index );

      this.setState({selectZone : index}) ;
  }
  getSelectZone( ikono ){
    return ikono.map( (el,ind) => {
      if (null != el.zone) return ({children: el.zone, value: ind}) ;
    });
  }

  onSelectZone(e){
    const index = e.target.value ;
    const zone = e.target.options[index].label ;
    console.log('select :', index, zone );
    this.setState({
      selectZone : index,
      selectZoneNom : zone,
    })
  }

  onRadio(e){
    // si re-clic sur un bouton radio, la valeur passe à hiddenvalue
    const hiddenValue = 'libre' ;
    const {selectZone} = this.state ;
    const {metasIkono, onSaisie} = this.props ;
    const {name, type, value} = e.target ;
    const {placement} = metasIkono[selectZone] ;

    const newValue = (placement === value) ? hiddenValue : value ;

  //  console.log('VALUE', newValue, placement, value);

    const out = {
      target:{
        name,
        type,
        value:newValue
      }
    };
    onSaisie(out) ;
  }
  /*
  uploadImage(){
    // transform va vers les metas ! pas vers image
    const {upload} = this.props ;
    const transform = {
      pox :  0,
      poy :  0,
      rot :  0,
      ech :  1,
      pivX : false,
      pivY : false,

      pristine : false, //true,
      zone:  'ecran01',
      placement: "libre"
    };

    upload(transform) ;
  }
  */

/*
rendre les contenus de metas en choisissant par Select.
- map les valeurs option: children de Select avec ikono.$.zone ;
- en retour de la valeur Select : le contenu de l'objet selectionné.
- faut-il passer par State ? -> faire passser la valeur de zone ?
- soit muter les variables issues de l'objet ikono,
- soit utiliser les refs directes de l'ojet -> lourd.
-> comportement interne au composant. Par contre les saisies sont bien envoyées au state.
-> le choix de la zone peut etre utile ailleurs, par exemple pour la préview de la vue.

*/
  render() {
    const {selectZone,selectZoneNom } = this.state ;
    const {onSaisie,upload,ikono,metasIkono} = this.props ;

    const placement = metasIkono[selectZone].placement || 'libre' ;
    //const placement =   'libre' ;
    const optionsSelectZone = this.getSelectZone(metasIkono) ;
    const placementPath = `metas.ikono.$[zone:${selectZoneNom}].placement` ;

    const {zone} = this.props ; // provisoire
    return(
      <div>
        <div>
          <Select
            label="Sélection de l'écran"
            name="ecran"
            value = { this.state.selectZone }
            options = { optionsSelectZone }
            onChange = { this.onSelectZone }
            rounded
          />
          <Flex
            align="center"
            justify="flex-start"
            wrap
          >
            <Radio
              name={placementPath}
              label='Couvrir'
              checked = {placement == 'cover'}
              value='cover'
              onChange={this.onRadio}
              />
            <Radio
              name= {placementPath}
              label='Contenir'
              checked = {placement == 'contains'}
              value='contains'
              onChange={this.onRadio}
              />
          </Flex>
        </div>

        <Button
          backgroundColor="primary"
          color="white"
          inverted
          rounded
          name="upload"
          onClick={upload}
        >
          Charger
        </Button>

        <div>
          <img src={ikono.preview} />
        </div>
      </div>
    )
  }
}
