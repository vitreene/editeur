{
    "_id" : "s8kmNACHHaty6omTm",
    "mainSeqID" : "seq20",
    "ecran" : "01",
    "projection" : {
        "seq10" : {
            "id" : "seq02",
            "onAir" : {
                "play" : true,
                "pointeur" : 1,
                "currentID" : "b",
                "nextID" : "c",
                "abortNext" : ""
            },
            "ordre" : [
                "b",
                "c"
            ],
            "vuesData" : [
                {
                    "id" : "c",
                    "template" : "composite",
                    "modele" : "row01-1-row02-2",
                    "duree" : 8000,
                    "zones" : [
                        {
                            "id" : "zoneA",
                            "sequenceID" : "seq02",
                            "className" : "zone-A"
                        },
                        {
                            "id" : "zoneB",
                            "sequenceID" : "seq03",
                            "className" : "zone-B"
                        },
                        {
                            "id" : "zoneC",
                            "totOsequenceID" : "widget-horaires",
                            "sequenceID" : "seq06",
                            "className" : "zone-C"
                        }
                    ]
                },
                {
                    "id" : "b",
                    "template" : "portfolio",
                    "duree" : 2000,
                    "titre" : {
                        "text" : "Say hello to",
                        "className" : "animated bounceInDown"
                    },
                    "legende" : {
                        "text" : "Vitreene",
                        "className" : "animated bounceInLeft"
                    },
                    "css" : {
                        "backgroundColor" : "blue"
                    }
                }
            ]
        },
        "seq02" : {
            "id" : "seq02",
            "onAir" : {
                "play" : true,
                "pointeur" : 1,
                "currentID" : "a",
                "nextID" : "b",
                "abortNext" : ""
            },
            "ordre" : [
                "a",
                "b",
                "c"
            ],
            "vuesData" : [
                {
                    "id" : "a",
                    "template" : "affiche",
                    "duree" : 2600,
                    "image" : {
                        "src" : "http://www.abbayecafe.com/wp-content/uploads/2014/05/Savoyard.png",
                        "className" : "animated flipInX"
                    },
                    "titre" : {
                        "text" : "Sandwich du jour",
                        "className" : "animated bounceInUp"
                    },
                    "legende" : {
                        "text" : "vitreene",
                        "className" : "animated fadeInUpBig"
                    },
                    "css" : {
                        "backgroundColor" : "transparent"
                    }
                },
                {
                    "id" : "b",
                    "template" : "portfolio",
                    "duree" : 2000,
                    "image" : {
                        "src" : "http://www.pointchaud.be/images/i_products/Large_Italien.jpg",
                        "className" : "animated flipInX"
                    },
                    "titre" : {
                        "text" : "Profitez des promos!",
                        "className" : "animated bounceInDown"
                    },
                    "legende" : {
                        "text" : "-50% !!",
                        "className" : "animated lightSpeedIn"
                    },
                    "accroche" : {
                        "text" : "seulement vendredi !",
                        "className" : "animated rotateInDownLeft"
                    },
                    "css" : {
                        "backgroundColor" : "khaki"
                    }
                },
                {
                    "id" : "c",
                    "template" : "affiche",
                    "duree" : 1200,
                    "titre" : {
                        "text" : "-Ca tombe sur moi ! ",
                        "className" : "animated bounceInDown"
                    },
                    "legende" : {
                        "text" : "et pas qu’un peu.",
                        "className" : "animated rotateInDownLeft"
                    },
                    "css" : {
                        "backgroundColor" : "violet"
                    }
                }
            ]
        },
        "seq03" : {
            "id" : "seq03",
            "onAir" : {
                "play" : true,
                "pointeur" : 1,
                "currentID" : "c",
                "nextID" : "a",
                "abortNext" : ""
            },
            "ordre" : [
                "c",
                "a",
                "b"
            ],
            "vuesData" : [
                {
                    "id" : "a",
                    "template" : "portfolio",
                    "duree" : 2600,
                    "image" : {
                        "src" : "http://www.pointchaud.be/images/i_products/Large_Parisdelice.jpg",
                        "className" : "animated zoomIn"
                    },
                    "titre" : {
                        "text" : "Comment allez-vous",
                        "className" : "animated bounceInDown"
                    },
                    "legende" : {
                        "text" : "Madame Titi ?",
                        "className" : "animated fadeIn"
                    },
                    "accroche" : {
                        "text" : "seulement dimanche !",
                        "className" : "animated fadeIn"
                    },
                    "css" : {
                        "backgroundColor" : "yellow"
                    }
                },
                {
                    "id" : "b",
                    "template" : "affiche",
                    "duree" : 1600,
                    "titre" : {
                        "text" : "-Assurement ! ",
                        "className" : "animated bounceInDown"
                    },
                    "legende" : {
                        "text" : "C’est vraiment bieng",
                        "className" : "animated fadeIn"
                    },
                    "css" : {
                        "backgroundColor" : "darkgreen"
                    }
                },
                {
                    "id" : "c",
                    "template" : "affiche",
                    "duree" : 1200,
                    "titre" : {
                        "text" : "-a bientot ! ",
                        "className" : "animated bounceInDown"
                    },
                    "legende" : {
                        "text" : "pour de nouvelles aventures.",
                        "className" : "animated fadeIn"
                    },
                    "css" : {
                        "backgroundColor" : "orange"
                    }
                }
            ]
        },
        "seq04" : {
            "id" : "seq04",
            "onAir" : {
                "play" : true,
                "pointeur" : 0,
                "currentID" : "a",
                "nextID" : "c",
                "abortNext" : ""
            },
            "ordre" : [
                "c",
                "a"
            ],
            "vuesData" : [
                {
                    "id" : "a",
                    "className" : "portfolio-10",
                    "transition" : "slidedown",
                    "duree" : 1600,
                    "template" : "portfolio",
                    "image" : {
                        "src" : "./icono/selection-du-weekend-178-66.jpg",
                        "className" : "animated zoomIn"
                    },
                    "titre" : {
                        "text" : "Comment allez-vous",
                        "className" : "animated bounceInDown"
                    },
                    "legende" : {
                        "text" : "Madame Titi ?",
                        "className" : "animated fadeIn"
                    },
                    "accroche" : {
                        "text" : "seulement dimanche !",
                        "className" : "animated fadeIn"
                    },
                    "css" : {
                        "backgroundColor" : "corail"
                    }
                },
                {
                    "id" : "c",
                    "template" : "affiche",
                    "duree" : 1000,
                    "className" : "affiche-10",
                    "transition" : "slidedown",
                    "titre" : {
                        "text" : "-Vraiment !",
                        "className" : "animated bounceInDown"
                    },
                    "legende" : {
                        "text" : "on ne peut mieux.",
                        "className" : "animated fadeIn"
                    },
                    "css" : {
                        "backgroundColor" : "darkred",
                        "backgroundImage" : "url(./icono/tete-d-ours-brun.JPG)"
                    }
                }
            ]
        },
        "seq06" : {
            "id" : "seq06",
            "onAir" : {
                "play" : true,
                "pointeur" : 1,
                "currentID" : "a",
                "nextID" : "a",
                "abortNext" : ""
            },
            "ordre" : [
                "a"
            ],
            "vuesData" : [
                {
                    "id" : "a",
                    "css" : {
                        "backgroundColor" : "coral"
                    },
                    "className" : "portfolio-10",
                    "transition" : "slidedown",
                    "duree" : 1600,
                    "template" : "w_horloge",
                    "nom" : "w_horloge"
                }
            ]
        },
        "seq20" : {
            "id" : "seq20",
            "onAir" : {
                "play" : true,
                "pointeur" : 0,
                "currentID" : "oxo",
                "nextID" : "oxo",
                "abortNext" : ""
            },
            "ordre" : [
                "oxo"
            ],
            "vuesData" : [
                {
                    "id" : "oxo",
                    "zones" : [
                        {
                            "id" : "zoneA",
                            "sequenceID" : "seq02",
                            "className" : "zone-A"
                        },
                        {
                            "id" : "zoneB",
                            "sequenceID" : "seq03",
                            "className" : "zone-B"
                        },
                        {
                            "id" : "zoneC",
                            "totOsequenceID" : "widget-horaires",
                            "sequenceID" : "seq04",
                            "className" : "zone-C"
                        }
                    ],
                    "duree" : 8000,
                    "template" : "composite",
                    "modele" : "row01-1-row02-2"
                }
            ]
        }
    }
}
