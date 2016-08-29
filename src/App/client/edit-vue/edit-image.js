import { Component, PropTypes } from 'react'

export default class EditImage extends Component {

  render() {
    const {upload, ikono} = this.props ;

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
