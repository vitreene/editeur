import Vues from 'App/collections/vues'

/*
quand la vignette est produite, elle doit etre aussi enregistrée dans Vues. Mais d'ici, je n'ai pas accès à la vue.
à quel endroit le faire ? il faut recupérer l'info dans ikono.

creer un tracker autorun qui genere une action update_vignette
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
    /*
    la copie vient soit d'ikono, soit de proxy.
    si proxy, chercher son orginalId
    */
    //  console.log('vignette', file._id, file.originalId);

    if (Ikonos.findOne(file.originalId))
      Ikonos.update(file.originalId, {$set: {"vignette": file.url}});

    else {
      const {originalId:fileSourceId }= Proxys.findOne(file.originalId,{fields:{originalId:1}} ) ;
      Ikonos.update(fileSourceId, {$set: {"vignette": file.url}});
      console.log('vignette-> source', fileSourceId);
    }
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
  transformWrite: function(from, to, fileId, file){

    const {transform:{rot,pox,poy,ech}} = file ;
    console.log('FILE (ProxysStore)', rot,pox,poy,ech);

    let gm = Npm.require('gm');
      if (gm) {
        gm(from)
          .resize(800, 800)
          //.trim()
          .rotate('green', rot)
          .gravity('Center')
          .sharpen(2)
          .quality(30)
          .autoOrient()
          .stream().pipe(to);
      } else {
        console.error("gm is not available", file);
      }
  },
  copyTo: [VignettesStore],
  onFinishUpload : function(file) {

    /* à mettre à jour
      proxys:[
        {ecran: 'ecran1', link: file.url}
      ]
     */

    Ikonos.update( file.originalId, {
      $set:{
        transform:'',
        "proxy": file.url
      }
    }, (err,res) => {
        if (err) console.log(err);
        // else console.log('RES', file._id, file.originalId) ;
      }
    );

    // nettoyer Proxy apres la copie
    Proxys.update(file._id, {
      $unset:{
        proxy:'',
        vignette:'',
        preview:'',
        transform:''
      }});

    // copie vers Vignette,
    // update lien
    // callback link ?
  }
});
