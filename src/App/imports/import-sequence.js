export let zones = {
  "_id" : "xyzecran01",
  "nom": "ecran01",
  "emplacement": "dans le salon",
  "longueur": 1920,
  "hauteur": 1080,
  "ratio": 1.77
}


export let sequences={
  _id:'liste',
  nom:'mes produits',
  vignette:"http://localhost:3000/ufs/vignettes/zzjabfrFqoanK3yWy/3912201.jpg",
  tempo: 3,
  rythme: 2,
  liste_id:'ma-liste',
  skin:'default',
  zone:'xyzecran01'
};

export let ListesVues={
  "_id" : "ma-liste",
  "liste" : [
    {
      "vue_id":'01',
      "visible":true,
      "ordre":'0'
    },
    {
      "vue_id":'02',
      "visible":true,
      "ordre":'1'
    },
    {
      "vue_id":'03',
      "visible":false,
      "ordre":'2'
    }
]
};
