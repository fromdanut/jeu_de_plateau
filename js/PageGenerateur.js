/*
    L'objet Page va modifier la page html, le DOM.
*/

var PageGenerateur = {

    COULEUR_JOUEUR: 'yellow',
    COULEUR_OBSTACLE: 'black',
    COULEUR_ARME: 'green',
    COULEUR_CELLULE: 'grey',

    setMaitreDuJeu: function(maitreDuJeu) {
        this.maitreDuJeu = maitreDuJeu;
    },

    getMaitreDuJeu: function() {
        return this.maitreDuJeu;
    },

    demanderActionMJ: function(position) {
        this.getMaitreDuJeu().jouerTour(position);
    },

    /*
        Créer une cellule d'un plateau.
    */
    creerCelluleElt: function(cellule, position) {
        // Créé le conteneur
        var celluleElt = document.createElement("div");
        celluleElt.classList.add("cellule");
        celluleElt.style.backgroundColor = cellule.getCouleur();
        // Ajoute l'id avec la position ("xy").
        celluleElt.id = position;

        // S'il ne s'agit pas d'un joueur.
        if (!Joueur.isPrototypeOf(cellule)) {
            // Vérifie si la cellule est accessible (pour la rendre rose).
            if (cellule.getAccessible()) {
                celluleElt.style.backgroundColor = 'pink';
                // add eventListener...

            }
        }
        else {

        }
        return celluleElt;
    },

    /*
        Après les avoir supprimé, créer l'ensemble des cellules d'un plateau en
        utilisant la méthode creerCellule. Puis rajoute les joueurs par dessus.
    */
    dessinerPlateau: function(plateau) {
        if (plateau instanceof Array) {

            // Enlève l'ensemble des cellules.
            var plateauElt = document.getElementById("plateau");
            while(plateauElt.lastChild) {
                plateauElt.removeChild(plateauElt.lastChild);
            }

            // Ajoute l'ensemble des cellules.
            for (var position = 0; position < plateau.length; position++) {
                // S'il y a un joueur.
                if (plateau[position].length > 1) {
                    var cellule = plateau[position][1]; // le joueur.
                }
                else {
                    var cellule = plateau[position][0]; // [0] car la cellule est englobée dans une array.
                }
                celluleElt = this.creerCelluleElt(cellule, position);
                plateauElt.appendChild(celluleElt);
            }

        }
        else {
            console.log("Operation impossible : argument plateau invalide.");
        }
    }
}
