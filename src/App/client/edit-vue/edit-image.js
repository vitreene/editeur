import { Component, PropTypes } from 'react'
import {UploadFS} from 'meteor/jalik:ufs';

import Ikonos from 'App/collections/ikonos'
import {IkonosStore} from 'App/collections/ikonos'

export default class EditImage extends Component {
  constructor(props) {
    super(props);
    this.upload  = this.upload.bind(this) ;
  }
  upload(){
    UploadFS.selectFiles(function (file) {
    const ikono = {
        name: file.name,
        size: file.size,
        type: file.type,
        customField1: 1337,
        customField2: {
            a: 1,
            b: 2
        }
    };

    const uploader = new UploadFS.Uploader({
        store: IkonosStore,
        adaptive: true,
        data: file,
        // The document to save in the collection
        file: ikono,
        // The error callback
        onError: function (err) {
            console.error(err);
        },
        onComplete: function (file) {
            console.log(file.name + ' has been uploaded');
        },
        onProgress: function (file, progress) {
            console.log(file.name + ' ' + (progress*100) + '% uploaded');
        }
    });

    uploader.start();
    });
  }

  render() {

    return(
      <button
        type="button"
        name="upload"
        onClick={this.upload}
        >
        Select files
      </button>

    )
  }
}
