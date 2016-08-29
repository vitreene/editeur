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

export let Ikonos = new
  Mongo.Collection('ikonos');

export let Previews = new
  Mongo.Collection('previews');

export let Proxys = new
  Mongo.Collection('proxys');


export let PreviewsStore = new UploadFS.store.Local({
    collection: Previews,
    name: 'previews',
    path: '../Uploads/previews',
    transformWrite: function(from, to, fileId, file){
      let gm = Npm.require('gm');
        if (gm) {
            gm(from)
                .resize(500, 500)
                .gravity('Center')
                .charcoal(2)
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

export let IkonosStore = new UploadFS.store.Local({
    collection: Ikonos,
    name: 'ikonos',
    path: '../Uploads/ikonos',
    // path: '/uploads/ikonos'
    copyTo: [PreviewsStore],

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
    path: '../Uploads/proxys'
});
