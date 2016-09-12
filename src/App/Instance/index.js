/*
  Instance se charge de creer une Projection à partr des données enregistrées.
  en entrée : _id de la vue
  en sortie : vue dans Projection,
    vignette à jour dans Vues.

  Etapes updateVue
  - redefinir le bon modele
  - charger le profil du modele
  - recueillir les metas de positionnement, le rythme et le tempo
  - determiner les influences de positionnement
  - générer les données pour chaque element de la vue.
  - mettre à jour Projection
  - pour l'image : y-a t'il eu modification ? si oui, generer proxy

  Etapes Creer Projection
  - assigné à une zone ? oui -> dimensions non-> default
  - sequence principale
  - reperer toutes ls séquences utilisées par la projection

  Etapes Creer sequence

*/


const termes = {
  tempo : {
    '0': 'lento',
    '1': 'moderato',
    '2': 'allegro',
    '3': 'vivace',
    '4': 'presto',
  },
  duree : {
    '0': 'minimum',
    '1': 'faible',
    '2': 'moyenne',
    '3': 'longue',
    '4': 'maximum',
  },
  position : {
    gauche: 'GA',
    droit:'DA',
    haut:'HA',
    bas:'BA',
    centre:'CA',
  },
  positionBadge : {
    gauche: 'DA',
    droit:'GA',
    haut:'HA', // ou bien : haut ?
    bas:'DA',
    centre:'CA',
  },
  lien :{},
  blocs : [
    // requis, oneOf, optionel
    // je peux creer des blocs selon toutes les combinaisons possibles
    {
      nom : 'bloc-titre',
      composants : { requis : ['titre', 'description'] }
    },
    {
      nom : 'bloc-prix',
      composants :  {
        requis : ['prix'],
        oneOf: ['offre','prix-promo']
      }
    },
    {
      nom : 'bloc-message',
      composants : { requis : ['bloc-titre', 'bloc-prix'] }
    },
    {
      nom : 'bloc-offre',
      composants : {
        // manque la condition: est un badge
        oneOf: ['accroche','condition']
      }
    },
    { // toujours
      nom : 'bloc-zone',
      composants : { oneOf: ['titre', 'description', 'ikono'] }
    },

  ]

};

const profils = [
  {
    nom : 'produit',
    composants : {
      requis: ['titre', 'prix'],
      facultatif: [
        'description', // facultatif
        'ikono_id', // facultatif
        'prix_promo', // facultatif
        'offre' // facultatif
      ]
    }
  },
  {
    nom : 'affiche',
    composants : {
      tous:[
        'titre',
        'description',
        'ikono_id'
      ]}
  },
  {
    nom : 'titrage',
    composants : {
      tous:[
      'titre',
      'ikono_id' //optionel
    ]}
  },
  {
    nom : 'portfolio',
    composants : {
      tous:[
      'description',
      'ikono_id'
    ]}
  },
  {
    nom : 'message',
    composants : {
      tous:[
      'titre',
      'description',
    ]},
  },
  {
    nom : 'visuel',
    composants : {
      tous:[
      'ikono_id'
    ]},
  },
  {
    nom : 'legende',
    composants : {
      tous:[
      'description',
    ]},
  },
  {
    nom : 'intitule',
    composants : {
      tous:[
      'titre',
    ]}
  },

]

//pour info :
const metas = {
  position : 'haut', // 'bas' | 'gauche' | 'droit' | 'centre'
  lien : true, // false
  accroche : 'badge', //  | 'bandeau'  | null
  condition : 'bandeau', //  | 'badge'  | null
  legal : null, //  | 'bandeau'  | 'badge'
  accrocheAncre: 'libre',  // 'haut'| 'bas'
  conditionAncre: 'libre',  // 'haut'| 'bas'
  image : 'cover' // contains | cerne | null
};


export default function Instance(_id) {
  // const Instance = function(_id) {
  // const vue = Meteor.call('getVue', _id) ;
  // const _id = '01' ;

  Meteor.call('getVue', _id,
    (err, vue) => {
      if (err) {
        alert(err);
      } else {
        console.log('VUE',vue);
        creerInstance(vue[_id]) ;
      }
    });
}

function  creerInstance( { source, ikono, metas } ){
  // identifier le modele selon la source
  const modele = findModele(source, profils) ;
  console.log('modele', modele);
  // traiter la source
  const instanceSource = processSource( modele, source, metas ) ;
  console.log('instanceSource', instanceSource);
  // traiter les blocs de placement
  const instanceBlocs = processBlocs( modele, metas ) ;
  console.log('instanceBlocs', instanceBlocs);
  // traiter l'image
  const instanceIkono = processIkono(ikono, metas) ;
  // assembler le résultat

}

function findModele(source, profils){
  // cherche le bon modele pour la source dans les profils
  /*
    produit -> requis [titre, prix]+ facultatif
    les autres : tous [a,b,c]
   */

  // construire un tableau à partir des keys de source, sans _id
  const composants = Object.keys(source).filter(key=>key!=='_id') ;

  const out = profils.filter( profil => {
    return collecteComposants(composants, profil)
  })
  return out[0] ;
}

function processSource( {composants, nom}, source, metas ){
  // composant = tous ou requis+facultatif
  const composant = reCompose(composants) ;
  let out = {} ;

  // donner les definitions precises des termes
  composant.map(function (item) {
     out[item] = {
       text : this[item],
       position: getPosition(item, metas),
       aspect : `${nom}-${item}`,
       transition : '' // ajouter
     } ;
  },source) ;

  return out ;
}

function processBlocs({composants, nom}, metas) {

  const composant = reCompose(composants) ;
  let blocs = [] ; // recueille la liste des blocs
  let out = {} ;

  // ajouter les badges
  const {accroche:{
    accroche:accroche,
    condition:condition
    }} = metas ;
  if (accroche ==='badge') composant.push('accroche') ;
  if (condition ==='badge') composant.push('condition') ;

  // identifier les blocs englobants
  for (const bloc of termes.blocs ){
    const _out = collecteComposants(composant, bloc) ;
    if (_out) {
      composant.push(_out) ;
      blocs.push(_out)
    };
  }

  // generer les classes associées aux blocs
  blocs.map( bloc => {
    out[bloc] = {
      position: getPosition(bloc, metas),
      aspect : `${nom}-${bloc}`,
      transition : ''
    };
  } )

  return out ;
}

function processIkono(ikono, metas) {
  /*
  metas : if cover ou contain -> creer proxyPlain ()
  // crer proxy (url, pox,poy, rot, scale, ecranx, ecrany)

  // -> callback : vignette, url proxy dans ikono
  sortie :
  - url,
  - styles  ou bien des metas pour le placement ?
  */
}

function reCompose(composants){
  // presente les elements du profil : tous, ou requis+facultatif
  const  { requis, facultatif, tous } = composants ;
  if (tous) return tous ;
  if (requis && facultatif) return requis.concat(facultatif);
  return null ;
}

function getPosition(item, metas){
  if (item==='ikono_id') {
    item = 'ikono' ;
    const {placement} = metas.ikono ;
    return `${item}-${placement}` ;
  };

  const {position, lien} = metas.source ;
  const pos = termes.position[position] ;
  const lier = (item==='description' && lien) ? 'lien-' : '' ;
  return `${item}-position-${lier}${pos}` ;
}

export function collecteComposants(composants, profil) {
  // renvoie le nom du modele s'il correspond à la source
  const { nom, composants:{requis, oneOf, tous} } = profil ;

  if (typeof requis === "undefined"
   && typeof oneOf === "undefined"
   && typeof tous === "undefined"
  ) return null ;

  const req = aDansB(composants, requis) ;
  const opt = aSomeB(composants, oneOf) ;
  const all = aTousB(composants, tous) ;

  if (req && opt && all) return nom ;
  return null ;
}

export function aTousB(composants, tous){
  // a et b contiennent les memes elements
  if (typeof tous === "undefined" || tous.length===0) return true ;

  let out = false ;

  if (composants.length === tous.length ) {
    out = tous.reduce( (prec, cour) =>{
      return (prec && (composants.indexOf(cour) > -1) )
    }, true );
  }
  // console.log('OUT', out );
  return out ;
}

export function aDansB(composants, requis){
  // tous les éléments requis sont dans composants
  if (typeof requis === "undefined") return true ;
  // true si requis est dans  composants
  return requis.reduce( (prec, cour) =>{
    return (prec && (composants.indexOf(cour) > -1) )
  }
   ,true)
}

export function aSomeB(composants, oneOf) {
  // au moins un des éléments de oneOf se trouve dans composants
  if (typeof oneOf === "undefined") return true ;
  return oneOf.reduce( (prec, cour) =>{
    return (prec || (composants.indexOf(cour) > -1) )
  }, false);
}
