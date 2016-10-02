import { Component, PropTypes } from 'react'

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
    const {upload,ikono} = this.props ;

    return(
      <div>
        <button
          type="button"
          name="upload"
          onClick={upload}
          >
          Charger
        </button>

        <img src={ikono.preview} />
        </div>
    )
  }
}
