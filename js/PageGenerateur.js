/*
    L'objet Page va modifier la page html, le DOM.
*/

var PageGenerateur = Object.create(Composant);

PageGenerateur.COULEUR_OBSTACLE = 'black';
PageGenerateur.COULEUR_ARME = 'green';
PageGenerateur.COULEUR_CELLULE = 'grey';

/*
    Rend une color rga 'rga(xxx,xxx,xxx)' transparante by adding ', 0.x)'.
*/
PageGenerateur.floutter = function(color) {
    if (typeof color !== 'string') {
        console.log("Operation impossible : argument color invalide.");
    }
    else {
        var newColor = color.slice(0, -1) + ', 0.7)';
        return newColor;
    }
}

/*
    Créer une cellule d'un plateau.
*/
PageGenerateur.creerCelluleElt = function(cellule, position) {
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
            celluleElt.style.backgroundColor = this.floutter(celluleElt.style.backgroundColor);
            celluleElt.style.border = 'solid yellow 1px';
            // Rendre le maitre du jeu accessible depuis l'element

            celluleElt.maitreDuJeu = this.getControlleur().getMaitreDuJeu();
            // add eventListener...
            celluleElt.addEventListener("click", function(e) {
                var position = e.target.id;
                var MJ = e.target.maitreDuJeu;
                MJ.jouerTour(position);
            });
        }
    }
    else {

    }
    return celluleElt;
}

/*
    Après les avoir supprimé, créer l'ensemble des cellules d'un plateau en
    utilisant la méthode creerCellule. Puis rajoute les joueurs par dessus.
*/
PageGenerateur.dessinerPlateau = function(plateau) {
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
