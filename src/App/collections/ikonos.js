let Ikonos = new
  Mongo.Collection('ikonos');

export default Ikonos


export let IkonosStore = new UploadFS.store.Local({
    collection: Ikonos,
    name: 'ikonos',
    path: 'App/uploads/ikonos'
    // path: '/uploads/ikonos'
});
