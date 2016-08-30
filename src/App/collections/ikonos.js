/*
  UploadFS.Store.prototype.getFileURL = function (fileId) {
      let file = this.getCollection().findOne(fileId, {
          fields: {name: 1}
      });

      console.log('UploadFS' ,
      file, '\n',
      encodeURIComponent(file.name),'\n',
      fileId, '\n',
      this.getURL(fileId + '/' + encodeURIComponent(file.name))
     );

      return file && this.getURL(fileId + '/' + encodeURIComponent(file.name));
  };
*/
/*
un soucis :
- les fichiers sont effacés à chaque redemarrage du serveur.
*/

import Vues from 'App/collections/vues'

/*
quand la vignette est produite, elle doit etre aussi enregistrée dans Vues. Mais d'ici, je n'ai pas accès à la vue.
à quel endroit le faire ? il faut recupérer l'info dans ikono.
*/

const UPLOAD_PATH = '/Users/Rve/Sites/Uploads/' ;

export let Ikonos = new
  Mongo.Collection('ikonos');

export let Previews = new
  Mongo.Collection('previews');

export let Proxys = new
  Mongo.Collection('proxys');

export let Vignettes = new
  Mongo.Collection('vignettes');


export let PreviewsStore = new UploadFS.store.Local({
    collection: Previews,
    name: 'previews',
    path: UPLOAD_PATH + 'previews', //'../Uploads/previews',
    transformWrite: function(from, to, fileId, file){
      let gm = Npm.require('gm');
        if (gm) {
            gm(from)
                .resize(500, 500)
                .gravity('Center')
                .sharpen(1)
                .quality(50)
                .autoOrient()
                .stream().pipe(to);
        } else {
            console.error("gm is not available", file);
        }
    },
    onFinishUpload : function(file) {
    //  console.log('onFinishUpload FILE', file );
      Ikonos.update(file.originalId, {$set: {"preview": file.url}});
    }
});


export let VignettesStore = new UploadFS.store.Local({
    collection: Vignettes,
    name: 'vignettes',
    path: UPLOAD_PATH + 'vignettes', //'../Uploads/previews',
    transformWrite: function(from, to, fileId, file){
      let gm = Npm.require('gm');
        if (gm) {
            gm(from)
                .resize(200, 200)
                .gravity('Center')
                .sharpen(2)
                .quality(30)
                .autoOrient()
                .stream().pipe(to);
        } else {
            console.error("gm is not available", file);
        }
    },
    onFinishUpload : function(file) {
    //  console.log('onFinishUpload FILE', file );
      Ikonos.update(file.originalId, {$set: {"vignette": file.url}});

    }
});

export let IkonosStore = new UploadFS.store.Local({
    collection: Ikonos,
    name: 'ikonos',
    path: UPLOAD_PATH + 'ikonos', //'../Uploads/ikonos',
    // path: '/uploads/ikonos'
    copyTo: [PreviewsStore,VignettesStore],

    onCopyError: function (err, fileId, file) {
      console.error('Cannot create copy ' + file.name);
    },
    onFinishUpload : function(file) {
      console.log('onFinishUpload IkonosStore :', file.name);

    }
});


export let ProxysStore = new UploadFS.store.Local({
    collection: Proxys,
    name: 'proxys',
    path: UPLOAD_PATH + 'proxys', //'../Uploads/proxys'
});
