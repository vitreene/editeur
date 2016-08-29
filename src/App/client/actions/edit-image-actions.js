
import {
  IMPORT_IMG,
} from 'App/client/constants/actionTypes'

import {UploadFS} from 'meteor/jalik:ufs';

import {processImage} from 'meteor/ccorcos:clientside-image-manipulation'

//import Ikonos from 'App/collections/ikonos'
import {IkonosStore} from 'App/collections/ikonos'

//import {Previews} from 'App/collections/ikonos'
//import {PreviewsStore} from 'App/collections/ikonos'

export function uploadFile(dispatch,_id) {

  /*
  - nettoyer les fonctions ;
  - etablir les relations entre les deux images ;
  -creer store preview
  - afficher l'image
  */

  // _id = _id de la vue editée
  let img_ID ;
  let preview = new Image();

  UploadFS.selectFile( (file) => {
  //  console.log('FILE', file);
    const ikono = {
        name: file.name,
        size: file.size,
        type: file.type
    };

    processImage(
      file,
      1000, 1000, 0.5,
      (data) => preview.src = data
    ) ;

    // l'action est dispatchée dès la création de la preview
    preview.onload = ()=>{
      return dispatch({
        type : IMPORT_IMG,
        img : {
          _id, // id de la vue,
          img_ID, // ajouter à source
          preview // à part, variable locale
        }
      });
    } ;

    const upSource = new UploadFS.Uploader({
        store: IkonosStore,
        adaptive: true,
        data: file,
        // The document to save in the collection
        file: ikono,
        // The error callback
        onError: function (err) {
          // a faire :
          // dispatch erreur, et annulation de la preview
            console.error(err);
        },
        onStart: (file) => {
        img_ID = file._id ;
        },
        onComplete: (file) => {
            console.log(file.name + ' has been uploaded');
        },
        onProgress: (file, progress) => {
          //  comment faire passer cette valeur à state ?
          //  console.log(file._id +' : ' +file.name + ' ' + (progress*100) + '% uploaded');
        }
    });

    upSource.start();


  }) ;

}

/*

*/

/*
function preview (file){
  console.log('file', file,file.name, file._id );

  const img = processImage(
    file,
    1000, 1000, 0.5,
    createPreview.bind(null,file.name, file._id )
  ) ;
  console.log('IMG', img);
  return img ;
}

function createPreview(name,img_ID, data){
  console.log( 'img_ID', img_ID);

    const previewFile = dataURLToBlob(data) ;

    const upPreview = new UploadFS.Uploader({
      store: ProxysStore,
      adaptive: true,
      data: previewFile,
      // The document to save in the collection
      file: {
          name: name,
          size: previewFile.size,
          type: previewFile.type,
          originalStore : "ikonos",
          originalId : img_ID,
      },
      onComplete: function (file) {
        console.log('preview ' + file.name + ' à été chargée');
      }
    });
// console.log('upPreview', upPreview );
    upPreview.start() ;

    return data ;
}
*/


////////// HELPERS

// https://github.com/ebidel/filer.js/blob/master/src/filer.js#L137
/*
function dataURLToBlob (dataURL) {
    var BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) == -1) {
      var parts = dataURL.split(',');
      var contentType = parts[0].split(':')[1];
      var raw = decodeURIComponent(parts[1]);

      return new Blob([raw], {type: contentType});
    }

    var parts = dataURL.split(BASE64_MARKER);
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;

    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], {type: contentType});
  }

*/
