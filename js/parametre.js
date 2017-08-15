/**
  * Les parametres du jeu sont accessibles depuis le controlleur.
  * Ils sont classés en fonction des composants qui s'en servent.
  */

var parametre = {

    // Parametre globaux, concerne surtout le controlleur.
    DISTANCE_DEPLACEMENT: 3,

    // Param pour la création des joueurs.
    J1: {
        nom: "Roger",
        img: "../img/j1.png",
        imgActif: "../img/j1_actif.png",
    },
    J2: {
        nom: "Regor",
        img: "../img/j2.png",
        imgActif: "../img/j2_actif.png",
    },

    // Param pour la création des cellules.
    ARME: {
        minimum: {
            degat: 10,
            img: "../img/arme_minimum.png",
            imgAccessible: "../img/arme_minimum_accessible.png",
        },
        faible: {
            degat: 15,
            img: "../img/arme_faible.png",
            imgAccessible: "../img/arme_faible_accessible.png",
        },
        moyen: {
            degat: 20,
            img: "../img/arme_moyen.png",
            imgAccessible: "../img/arme_moyen_accessible.png",
        },
        fort: {
            degat: 25,
            img: "../img/arme_fort.png",
            imgAccessible: "../img/arme_fort_accessible.png",
        },
    },

    OBSTACLE: {
        img: "../img/obstacle.png",
        imgAccessible: "../img/obstacle.png",
    },

    PORTE: {
        img: "../img/porte.png",
        imgAccessible: "../img/porte_accessible.png",
    },

    VIDE: {
        img: "../img/vide.png",
        imgAccessible: "../img/vide_accessible.png",
    },

    // Dimenssion du plateau pour le plateau Generateur
    NB_ARME_FAIBLE: 2,
    NB_ARME_MOYEN: 1,
    NB_ARME_FORT: 1,
    NB_OBSTACLE: 10,
    NB_PORTE: 1,
};
