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
      //console.log('vignette-> source', fileSourceId);
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
      console.error('Cannot create copy :', file._id, file.name );
    },
    onFinishUpload : function(file) {
      console.log('onFinishUpload IkonosStore :', file._id, file.name);

    }
});


export let ProxysStore = new UploadFS.store.Local({
  collection: Proxys,
  name: 'proxys',
  path: UPLOAD_PATH + 'proxys', //'../Uploads/proxys'
  transformWrite: function(from, to, fileId, file){

    const {transform:{rot,pox,poy,ech}} = file ;
    //console.log('FILE (ProxysStore)', rot,pox,poy,ech);

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
  /*
    mettre à jour le tableau proxy :
    si zone existe, alors mettre à jour src ;
    sinon, ajouter {zone,src} au tableau.

    -> il faut le faire en deux fois, car mongo refuse upsert sur un tableau.

      proxy:[
        {zone: 'ecran01', src: file.url}
      ]
     */

    const {proxy} = Ikonos.findOne({_id:file.originalId}) ;
    const {transform:{zone}, url:src} = file ;
    const hasZone = proxy.filter ( x => x.zone === zone) ;
    // proxy : [ { zone: 'ecran012', src: 'http://....jpg' } ]
    let updateProxy= [];

    if(hasZone.length>0){
      updateProxy = proxy.map( x =>
        {if (x.zone === zone) x.src = src ; return x;}
      );
    }
    else updateProxy = proxy.concat({zone, src}) ;

    Ikonos.update(
      { _id:file.originalId},
      { $set:{
        transform:'',
        proxy: updateProxy
      }
    }, errRes);

    // nettoyer Proxy apres la copie
    Proxys.update(file._id, {
      $unset:{
        proxy:'',
        vignette:'',
        preview:'',
        transform:''
      }
    }, errRes);

    }

      // copie vers Vignette,
      // update lien
      // callback link ?
});

function errRes(err,res) {
    if (err) console.log('ERR', err);
    else console.log('RES', res) ;
  }
