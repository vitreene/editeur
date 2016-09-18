export let termes = {
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

export let profils = [
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
  {
    nom : 'defaut',
    composants : {
      tous:[]
    }
  },

]

//pour info :
export let metas = {
  position : 'haut', // 'bas' | 'gauche' | 'droit' | 'centre'
  lien : true, // false
  accroche : 'badge', //  | 'bandeau'  | null
  condition : 'bandeau', //  | 'badge'  | null
  legal : null, //  | 'bandeau'  | 'badge'
  accrocheAncre: 'libre',  // 'haut'| 'bas'
  conditionAncre: 'libre',  // 'haut'| 'bas'
  image : 'cover' // contains | cerne | null
};
