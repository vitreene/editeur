/*
  a faire sur projecteur :
  - creer le composant Produit,
  # gérer les variantes de composites,
  - composant badge, prix, prixbarre, description
  - composant horaire + logo
  - remplacer le terme 'image' par 'visuel'
  -> comment charger des composants depuis le serveur ?


  a faire pour la demo :
  preparer les images, pour les cadrer a peu pres comme sur la maquette.
  -> comment gérer le placement plus tard ?
    - cadrage logiciel,
    - transformation css, ne doit pas géner une animation.
    - aboutir les styles et les animations.
*/

export const composite = {
  _id:'test',
  mainSeqID:'main',
  ecran:'01',
  projection:{
    'boissons':{
      id: 'boissons',
      onAir:{
        play: true,
        pointeur: 1,
        currentID:'jus',
        nextID:'soda',
        abortNext:'',
      },
      ordre :['jus','soda','pago'],
      vuesData : [
        {
          id:'jus',
          template:'produit',
          duree:2600,
          //
          visuel:{
            src: './icono/DDW_868782.jpg',
            className:'animated slideInRight',
          },
          bloctitre:'mistral-bloc-titre',
          titre:{
            text:'Jus d\'orange',
            className:'',
          },
          description:{
            text:'pur jus d‘orange’',
            className:'',
          },
          offre:{
            text:'le verre 33cl',
            className:'',
          },
          /*
          prixbarre:{},
          */
          prix:{
            text:'2,50',
            currency:'€',
            cents:'00',
            className:'',
          },
          /*
          action:{},
          */
          //
          css:{},
          className:'bl-top-right',
        },
        {
          id:'pago',
          template:'produit',
          duree:2600,
          //
          visuel:{
            src: './icono/pago-poire-75cl-gms-fruits.jpg',
            className:'animated slideInRight',
          },
          bloctitre:'mistral-bloc-titre',
          titre:{
            text:'Jus multifruit',
            className:'',
          },
          description:{
            text:'orange, papaye, ananas, pomme, raisin',
            className:'',
          },
          offre:{
            text:'la bouteille de 50cl',
            className:'',
          },
          /*
          prixbarre:{},
          */
          prix:{
            text:'2,80',
            currency:'€',
            cents:'00',
            className:'',
          },
          /*
          action:{},
          */
          //
          css:{},
          className:'bl-top-right',
        },
        {
          id:'soda',
          template:'produit',
          duree:2600,
          //
          visuel:{
            src: './icono/ORANGINA--CANETTE.jpg',
            className:'animated slideInRight',
          },
          bloctitre:'mistral-bloc-titre',
          titre:{
            text:'Canette soda',
            className:'',
          },
          description:{
            text:'Orangina, Coca, Coca zero, Schweppes',
            className:'',
          },
          offre:{
            text:'la canette de 33cl',
            className:'',
          },
          /*
          prixbarre:{},
          */
          prix:{
            text:'2,40',
            currency:'€',
            cents:'00',
            className:'',
          },
          /*
          action:{},
          */
          //
          css:{},
          className:'bl-top-right',
        },
      ],
    },
    'desserts':{
      id: 'desserts',
      onAir:{
        play: true,
        pointeur: 1,
        currentID:'glace',
        nextID:'panna',
        abortNext:'',
      },
      ordre :['glace','panna','tarte'],
      vuesData : [
        {
          id:'glace',
          template:'produit',
          duree:2600,
          //
          visuel:{
            src: './icono/image001miam.jpg',
            className:'animated slideInRight',
          },
          bloctitre:'mistral-bloc-titre',
          titre:{
            text:'Coupe de glace',
            className:'',
          },
          description:{
            text:'12 parfums au choix',
            className:'',
          },
          offre:{
            text:'2 boules, chantilly',
            className:'',
          },
          /*
          prixbarre:{},
          */
          prix:{
            text:'4,50',
            currency:'€',
            cents:'00',
            className:'',
          },
          /*
          action:{},
          */
          //
          css:{},
          className:'bl-top-right',
        },
        {
          id:'panna',
          template:'produit',
          duree:2600,
          //
          visuel:{
            src: './icono/e8cd624a-0171-4911-8d8a-e07e52b6e32f.jpg',
            className:'animated slideInRight',
          },
          bloctitre:'mistral-bloc-titre',
          titre:{
            text:'Panna cotta',
            className:'',
          },
          description:{
            text:'panna cotta et caramel salé',
            className:'',
          },
          offre:{
            text:'la part',
            className:'',
          },
          prixbarre:{
            text:'4,50',
            currency:'€',
            cents:'00',
            accroche:'promo',
            className:'',
          },
          prix:{
            text:'3,80',
            currency:'€',
            cents:'00',
            className:'',
          },
          action:{
            text:'Aujourd\'hui seulement',
            template: 'badge',
            forme:'chevron-bas',
            className:'',
          },
          //
          css:{},
          className:'bl-top-right ac-under-bl',
        },
        {
          id:'tarte',
          template:'produit',
          duree:2600,
          //
          visuel:{
            src: './icono/Large_Tartelette-chocolat640.jpg',
            className:'animated slideInRight',
          },
          bloctitre:'mistral-bloc-titre',
          titre:{
            text:'Tartelette au chocolat',
            className:'',
          },
          description:{
            text:'13 desserts au choix',
            className:'',
          },
          offre:{
            text:'la part',
            className:'',
          },
          prixbarre:{
            text:'4,50',
            currency:'€',
            cents:'00',
            accroche:'promo',
            className:'',
          },
          prix:{
            text:'3,80',
            currency:'€',
            cents:'00',
            className:'',
          },
          action:{
            text:'fait maison !',
            template: 'badge',
            forme:'chevron-bas',
            className:'',
          },
          //
          css:{},
          className:'bl-top-right ac-under-bl',
        },
      ],
    },
    'sandwiches':{
      id: 'sandwiches',
      onAir:{
        play: true,
        pointeur: 1,
        currentID:'poulet',
        nextID:'crudites',
        abortNext:'',
      },
      ordre :['poulet','crudites'],
      vuesData : [
        {
          id:'poulet',
          template:'produit',
          duree:4000,
          //
          visuel:{
            src: './icono/0a8143be-9497-4138-86f3-2b8828ff988b.jpg',
            className:'animated zoomIn',
          },
          bloctitre:'mistral-bloc-titre',
          titre:{
            text:'Sandwich poulet-moutarde',
            //text:'Cosima aime les cerises',
            className:'',
          },
          description:{
            text:'Pain de mie, poulet, tomates, oignons, moutarde',
            className:'',
          },
          //offre:{},
          //prixbarre:{},
          prix:{
            text:'5,50',
            currency:'€',
            cents:'00',
            className:'',
          },
          action:{
            text:'Menu de la semaine',
            template: 'badge animated delay01 bounceInLeft',
            forme:'corolle',
            className:'',
          },
          //
          css:{},
          className:'bl-top-right ac-top-left',
          transition:'slidedown',
        },
        {
          id:'crudites',
          template:'produit',
          duree:2600,
          //
          visuel:{
            src: './icono/63201bdd-b0be-4dca-9a99-ce6075fd73be.JPG',
            className:'animated zoomIn',
          },
          bloctitre:'mistral-bloc-titre',
          titre:{
            text:'Sandwich aux crudités',
            className:'',
          },
          description:{
            text:'Pain sésame, tomate séchée, comcombre, oignon rouge',
            className:'',
          },
          /*
          offre:{
            text:'',
            className:'',
          },
          prixbarre:{},
          */
          prix:{
            text:'5,50',
            currency:'€',
            cents:'00',
            className:'',
          },
          action:{
            text:'Aujourd\'hui seulement ! \navec le menu du jour à 8,90€',
            template: 'badge',
            forme:'bandeau',
            className:'animated bounceInLeft',
          },
          //
          css:{},
          className:'bl-top-right ac-top-left',
          transition:'slidedown',
        },
      ],
    },
    'corporate':{
      id: 'corporate',
      onAir:{
        play: true,
        pointeur: 0,
        currentID:'corporate',
        nextID:'corporate',
        abortNext:'',
      },
      ordre :['corporate'],
      vuesData : [
        {
          id:'corporate',
          template:'w_horaires_logo',
          duree:0,
          visuel:{
            src: './icono/tete-d-ours-brun.JPG',
            className:'animated slideInRight',
          },
        },
      ],
    },
    'main':{
      id: 'main',
      onAir:{
        play: true,
        pointeur: 1,
        currentID:'test',
        nextID:'menu01',
        // currentID:'menu01',
        // nextID:'carousel01',
        abortNext:'',
      },
      //ordre :['test','menu01'],
      ordre :['test','menu01', 'carousel01'],
      vuesData : [
        {
          id:'carousel01',
          template:'composite',
          modele: 'row01-1-row02-3',
          duree:8000,
          zones :[
            {
              id: 'zoneA',
              sequenceID: 'sandwiches',
              className: 'zone-a'
            },
            {
              id: 'zoneB',
              sequenceID: 'boissons',
              className: 'zone-b'
            },
            {
              id: 'zoneC',
              sequenceID: 'corporate',
              className: 'zone-c'
            },
            {
              id: 'zoneD',
              sequenceID: 'desserts',
              className: 'zone-d'
            },
          ],
        },
        {
          id:'menu01',
          template:'portfolio',
          duree:2000,
          titre:{
            text:'Say hello to',
            className:'animated bounceInDown',
          },
          legende:{
            text:'Vitreene',
            className:'animated bounceInLeft',
          },
          css:{
            backgroundColor:'blue',
          },
        },
        {
          id:'test',
          template:'imageflou',
          duree:1500,
          titre:{
            text:'Say hello to',
            className:'animated bounceInDown',
          },
          visuel:{
            src: './icono/63201bdd-b0be-4dca-9a99-ce6075fd73be.JPG',
            className:'animated zoomIn',
          },
          css:{
            backgroundColor:'blue',
          },
        },
      ],
    },
  }
}
