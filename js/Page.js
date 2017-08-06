/*
    L'objet Page va modifier la page html, le DOM.
*/

var Page = {
    initPage: function(maitreDuJeu) {
        this.setmaitreDuJeu(maitreDuJeu);
    }

    getMaitreDuJeu: function() {
        return this.maitreDuJeu;
    }

    setMaitreDuJeu: function(maitreDuJeu) {
        //
        if (true) {
            this.maitreDuJeu = maitreDuJeu;
        }
        else {
            console.log("Operation impossible : argument maitreDuJeu invalide.");
        }
    }
    /*
        Créer un élément d'une carte: une case. Puis, l'ajoute à la carte.
    */
    creerCaseElt: function(case, maitreDuJeu) {
        // Créé le conteneur
        caseElt = document.createElement("div");
        caseElt.listClass.add("col-xs-1");
        // Créé l'image.
        imgElt = document.createElement("img");
        imgElt.src = case.urlImage;
        img.listClass.add("img-responsive");
        // Ajoute l'id ("xy").
        divElt.id = String(case.position.getX()) + String(case.position.getY());
        // Ajoute l'image dans un lien si case vide (clickable pour le joueur).
        if (case.isPrototypeOf(Vide)) {
            if (case.accessible === true) {
                aElt = document.createElement("a");
                aElt.appendChild(imgElt);
                // Gestion de l'événement lors du click sur la case.
                aElt.addEventListener("click", function(e) {
                    this.getMaitreDuJeu().jouerTour(case.position);
                    this.dessinerCarte(this.getMaitreDuJeu().getCarte());
                });
                caseElt.appendChild(aElt);
            }
        }
        // Ajoute directement l'image.
        else {
            caseElt.appendChild(imageElt);
        }
        return caseElt;
    }

    /*
        Après les avoir supprimé, créer l'ensemble des cases d'une carte via la
        méthode creerCase.
    */
    dessinerCarte: function(carte) {
        if (carte.prototypeOf(Carte)) {
            carteElt = document.getElementById("carte");
            // Enlève l'ensemble des cases.
            while(carteElt.lastChild) {
                carteElt.removeChild(carteElt.lastChild);
            }
            // Ajoute les nouvelles cases.
            carte.carte.forEach(function(ligne) {
                ligne.forEach(function (colonne) {
                    caseElt = creerCaseElt(carte[ligne][colonne], );
                    carteElt.appendChild(caseElt);
                });
            });
        }
        else {
            console.log("Operation impossible : argument carte invalide.");
        }
    }
}
