//import { Mongo } from 'meteor/mongo'
import { Class } from 'meteor/jagi:astronomy';

const  Vues = new Mongo.Collection("vues");

export default Vues

export let Vue = Class.create({
  name: 'Vue',
  collection: Vues,
  fields: {
    // _id: Mongo.ObjectID,
    _id: String,
    ordre: Number,
    visible : Boolean,
    titre: {
      type: String,
      validators: [
        { type: 'minLength', param: 3 },
        { type: 'maxLength', param: 24 },
        ]
    },
    vignette: String,
    sequence_id: String,
    source_id: String,
    modele: String,
    skin: String,
    couleur:{ type:String, optional: true }
  },
  methods: {
    toggle_visibility() {
      this.visible = !this.visible ;
      return this.visible;
    }
  }
});
