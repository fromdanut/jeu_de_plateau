/**
  * Les parametres du jeu sont accessibles depuis le controlleur.
  * Ils sont classés en fonction des composants qui s'en servent.
  */

var parametre = {

    // Parametre pour la gestion du plateau concerne le MaitreDuJ et controlleur.
    DISTANCE_DEPLACEMENT: 3,
    NB_ARME_FAIBLE: 2,
    NB_ARME_MOYEN: 1,
    NB_ARME_FORT: 1,
    NB_OBSTACLE: 10,
    NB_VORTEX: 1,
    NB_ECHANGEUR: 1,

    // Parametre pour le rendu, concerne surtout la Page.
    J1: {
        nom: "Nibor",
        img: "img/joueur/j1.png",
        imgActif: "img/joueur/j1_actif.png",
        imgCombat: "img/joueur/j1_combat.png",
        imgVainqueur: "img/joueur/j1_vainqueur.png",
    },
    J2: {
        nom: "Ribno",
        img: "img/joueur/j2.png",
        imgActif: "img/joueur/j2_actif.png",
        imgCombat: "img/joueur/j2_combat.png",
        imgVainqueur: "img/joueur/j2_vainqueur.png",
    },

    // Param pour la création des cellules.
    ARME: {
        minimum: {
            degat: 10,
            img: "img/cellule/arme/arme_minimum.png",
            imgAccessible: "img/cellule/arme/arme_minimum_accessible.png",
            help: "Arme de base, équivalent d'un cure dent ébréché.",
        },
        faible: {
            degat: 15,
            img: "img/cellule/arme/arme_faible.png",
            imgAccessible: "img/cellule/arme/arme_faible_accessible.png",
            help: "Juste un petit canif, t'enflamme pas trop...",
        },
        moyen: {
            degat: 20,
            img: "img/cellule/arme/arme_moyen.png",
            imgAccessible: "img/cellule/arme/arme_moyen_accessible.png",
            help: "Arme qui commence à ressembler à quelque chose.",
        },
        fort: {
            degat: 25,
            img: "img/cellule/arme/arme_fort.png",
            imgAccessible: "img/cellule/arme/arme_fort_accessible.png",
            help: "Le hachoir de boris, attention ça coupe.",
        },
    },

    OBSTACLE: {
        img: "img/cellule/obstacle.png",
        imgAccessible: "img/cellule/obstacle.png",
        help: "Obstacle infranchissable en pierre de mousse",
    },

    VORTEX: {
        img: "img/cellule/vortex.png",
        imgAccessible: "img/cellule/vortex_accessible.png",
        help: "Le vortex te déplace au hasard sur le plateau",
    },
    ECHANGEUR: {
        img: "img/cellule/echangeur.png",
        imgAccessible: "img/cellule/echangeur_accessible.png",
        help: "Echange ton arme avec celle de ton adversaire.",
    },


    VIDE: {
        img: "img/cellule/vide.png",
        imgAccessible: "img/cellule/vide_accessible.png",
    },

};
