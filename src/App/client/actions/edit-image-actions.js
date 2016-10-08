
import {
  IMPORT_IMG,
  UPDATE_CARDVUE,
  UPDATE_METAS_IKONO,
} from 'App/client/constants/actionTypes'

import {UploadFS} from 'meteor/jalik:ufs';
import {processImage} from 'meteor/ccorcos:clientside-image-manipulation'

import {Ikonos} from 'App/collections/ikonos'
import {IkonosStore} from 'App/collections/ikonos'

export function uploadFile(dispatch, cardVue, transform) {
  //termes à changer :
  // vignette -> cardVue
  // vignetteIMG -> vignette

  // _id = _id de la vue editée
  const {vue_id} = cardVue ;
  
console.log('uploadFile : vue_id :', vue_id);

  let img_ID ;
  let preview = new Image();
  let vignetteIMG = new Image();

  UploadFS.selectFile( (file) => {

    const ikono = {
        name: file.name,
        size: file.size,
        type: file.type,
        vignette:'',
        preview:'',
        proxy:[],
        cerne:{},
    };

    processImage(
      file,
      500, 500, 0.5,
      (dataUrl) => preview.src = dataUrl
    ) ;
    processImage(
      file,
      200, 150, 0.5,
      (dataUrl) => vignetteIMG.src = dataUrl
    ) ;

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
        // img_id = file._id ;

        // -> update Preview et vignette ?

        // l'action est dispatchée dès la création de la preview
        preview.onload = ()=>{
          return dispatch({
            type : IMPORT_IMG,
            img : {
              vue_id, // id de la vue,
              img_id: file._id, // ajouter à source
              preview, // à part, variable locale
            }
          });
        } ;

        vignetteIMG.onload = ()=>{
          cardVue.vignette = vignetteIMG.src ;
          return dispatch({
            type : UPDATE_CARDVUE,
            vignette : cardVue
          });
        } ;


        },
        onComplete: (file) => {
          console.log(file._id, file.name + ' has been uploaded');

          return dispatch({
            type : UPDATE_METAS_IKONO,
            vue_id,
            transform
          });

        },
        onProgress: (file, progress) => {
          //  comment faire passer cette valeur à state ?
          // sans redux, inutile ici
          //  console.log(file._id +' : ' +file.name + ' ' + (progress*100) + '% uploaded');
        }
    });

    upSource.start();

  }) ;

}
