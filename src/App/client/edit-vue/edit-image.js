import { Component, PropTypes } from 'react'
import {
  Radio,
  Select
} from 'rebass'


export default class EditImage extends Component {
  /*
  constructor(props) {
    super(props);
    this.uploadImage = this.uploadImage.bind(this);
  }
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

  render() {
    const {onSaisie,upload,ikono} = this.props ;
    const {zone} = this.props ;
  //  const {placement} = this.props.vue.metas.ikono['1'] ;
  const placement = 'cover' ;

    return(
      <div>
        <button
          type="button"
          name="upload"
          onClick={upload}
          >
          Charger
        </button>
        <div>
          <Select
            label="Sélection de l'écran"
            name="ecran"
            options={[
              {children: zone, value: 1},
              {children: 'defaut', value: 0},
            ]}
            rounded
          />
          <Radio
            name='metas.ikono.$[zone:ecran01].placement'
            label='Couvrir'
            checked = {placement == 'cover'}
            value='cover'
            onChange={onSaisie}
            />
          <Radio
            name='metas.ikono.$[zone:ecran01].placement'
            label='Contenir'
            checked = {placement == 'contains'}
            value='contains'
            onChange={onSaisie}
            />

        </div>
        <img src={ikono.preview} />
        </div>
    )
  }
}
