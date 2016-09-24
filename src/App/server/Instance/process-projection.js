/*
Projection contient les données de sequence
entrée :


sortie :
_id :, -> sequence_id
mainSeqID: sir c'est sequence_id, alors je n'en n'ai pas besoin ? ,
zone: Sequence.zone,
tempo; ?,
rythme: ?,
skin: default,
projection: {
  sequence_id :{
  id: sequence_id,
  onAir:{
    play,
    currentID
  },
  ordre : [ ListeVues (sequence_id) ]
}
*/

export function getOrdreListe(liste) {
/*
  console.log('LISTE', liste );

  const liste1 = liste.filter( x => x.visible ) ;
  console.log('LISTE1', liste1 );

  const liste2 = liste1.sort( (a,b) => a.ordre - b.ordre ) ;
  console.log('LISTE2', liste2 );

  const liste3 = liste2.map( x => x.vue_id) ;
  console.log('LISTE3', liste3 );

  return liste3 ;
  */
  return liste
    .filter( x => x.visible )
    .sort( (a,b) => a.ordre - b.ordre )
    .map( x => x.vue_id) ;
}

export default function Projection(sequence_id='liste') {

  if (Meteor.isClient) console.log('PROJECTION est sur CLIENT');
  if (Meteor.isServer) console.log('PROJECTION est sur SERVEUR');

  const seq = Meteor.call('getSequence', sequence_id ) ;
  const {liste_id,zone,skin} = seq ;
  const {liste} = ListeVues.findOne({_id:liste_id}, {fields:{liste:1}} ) ;

  console.log( 'liste', liste );
  console.log( 'ordre', ordre );

  return {
    _id: '',
    mainSeqID: '',
    zone,
    skin,
    //tempo: '',
    //rythme: '',
    projection: {
      [sequence_id]: {
        id: '',
        onAir: {
          play: true,
          currentID: ''
        },
        ordre
      }
    }
  };
}
