{
  ///////////////////////////////////
  // ZONES
  ///////////////////////////////////
  {
      "_id" : "xyzecran01",
      "nom" : "ecran01",
      "emplacement" : "dans le salon",
      "longueur" : 1920,
      "hauteur" : 1080,
      "ratio" : 1.77
  }
  ,
  ///////////////////////////////////
  // SEQUENCES
  ///////////////////////////////////
  {
      "_id" : "liste",
      "nom" : "mes produits",
      "liste_id" : "ma-liste",
      "zone" : "ecran01" // id de la zone (il faut aussi son nom)
      "skin" : "default",
      "vignette" : "http://localhost:3000/ufs/vignettes/zzjabfrFqoanK3yWy/3912201.jpg",
      "tempo" : 3,
      "rythme" : 2,
  }
  ,
  ///////////////////////////////////
  // CARDVUES
  ///////////////////////////////////
  {
      "_id" : "joQ9q22PK5qxD4fEd",
      "liste_id" : "ma-liste",
      "duree" : "1600", // valeur entre 1 et 5
      "ordre" : 4,
      "visible" : false,
      "titre" : "ma vignette du soir, esp",
      "vignette" : "http://localhost:3000/ufs/vignettes/xpQJoPztjNoaZ9g6q/644686_368400489931056_184222538_n.png",
      "couleur" : "blue"
  }
  ,
  ///////////////////////////////////
  // VUES
  ///////////////////////////////////
  {
      "_id" : "joQ9q22PK5qxD4fEd",
      "sequence_id" : "liste", // non ! pas de lien
      "source_id" : "QHWrMCm6staCKhX79",
      "metas_id" : "aMQAgbykDhiPzaWMu",
      "modele" : "affiche-produit",
      // "skin" : "default", // a venir ?
  }
  ,
  ///////////////////////////////////
  // SOURCES
  ///////////////////////////////////
  {
      "_id" : "QHWrMCm6staCKhX79",
      "ikono_id" : "4rQmZo2bgBfEyn2Ss"
      "titre" : "ma vignette du soir, espoir",
      "description" : "une belle edition à publier",
      "offre" : null,
      "prix" : 60,
      "prix_promo" : null,
  }
  ,
  ///////////////////////////////////
  // Metas
  ///////////////////////////////////
  {
      "_id" : "aMQAgbykDhiPzaWMu",
      "source" : {
          "lien" : true,
          "position" : "gauche"
      },
      "ikono" : [
          {
              "zone" : "defaut",
              "placement" : "cover",
              "pristine" : null,
              "pox" : null,
              "poy" : null,
              "rot" : null,
              "ech" : null,
              "pivX" : null,
              "pivY" : null
          },
          {
              "pox" : 0,
              "poy" : 0,
              "rot" : 0,
              "ech" : 1,
              "pivX" : false,
              "pivY" : false,
              "pristine" : false,
              "zone" : "ecran01",
              "placement" : "libre"
          }
      ],
      "accroche" : {
          "action" : {
              "aspect" : "badge",
              "position" : {
                  "bandeau" : null,
                  "badge" : "libre"
              },
              "modele" : null,
              "texte" : null
          },
          "condition" : {
              "aspect" : null,
              "position" : {
                  "bandeau" : null,
                  "badge" : null
              },
              "modele" : null,
              "texte" : null
          },
          "legal" : {
              "aspect" : null,
              "position" : {
                  "bandeau" : null,
                  "badge" : null
              },
              "modele" : null,
              "texte" : null
          }
      },
      "date" : 1475440629014.0
  }
  ,
  ///////////////////////////////////
  // IKONO
  ///////////////////////////////////

  {
      "_id" : "4rQmZo2bgBfEyn2Ss",
      "name" : "644686_368400489931056_184222538_n.png",
      "size" : 246820,
      "type" : "image/png",
      "vignette" : "http://localhost:3000/ufs/vignettes/xbn4cRuXcmoXG3RjT/644686_368400489931056_184222538_n.png",
      "preview" : "http://localhost:3000/ufs/previews/BcphpDQcMPEEyQuKz/644686_368400489931056_184222538_n.png",
      "proxy" : [
          {
              "zone" : "ecran01",
              "src" : "http://localhost:3000/ufs/proxys/wnz2AxSiHWcZxaeby/644686_368400489931056_184222538_n.png"
          }
      ],
      "cerne" : {},
      "store" : "ikonos",
      "complete" : true,
      "uploading" : false,
      "extension" : "png",
      "progress" : 1,
      "userId" : null,
      "path" : "ufs/ikonos/4rQmZo2bgBfEyn2Ss/644686_368400489931056_184222538_n.png",
      "token" : "9B1988eaA9",
      "uploadedAt" : ISODate("2016-10-02T20:36:59.318Z"),
      "url" : "http://localhost:3000/ufs/ikonos/4rQmZo2bgBfEyn2Ss/644686_368400489931056_184222538_n.png",
      "transform" : "" // doit etre effacé ?
  }
}
