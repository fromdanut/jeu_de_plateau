/**
  * L'objet Page Generateur va modifier la page html via le DOM.
  */

var Page = Object.create(Composant);


/**
  * Créer un élément à partir d'une cellule d'un plateau.
  *
  * @param	 {Cellule}	cellule	    La cellule modèle pour l'élément.
  * @param	 {Number}	position    La position.
  * @returns {Element}              L'élément cellule.
  */
Page.creerCelluleElt = function(cellule, position) {
    // Créé l'élément.
    var celluleElt = document.createElement("td");
    celluleElt.classList.add("cellule");
    // Ajoute l'id avec la position ("xy").
    celluleElt.id = position;

    // Ajoute l'image correspondant à la cellule.
    celluleElt.style.backgroundImage = cellule.getImg();

    // S'il ne s'agit pas d'un joueur.
    if (!Joueur.isPrototypeOf(cellule)) {
        // Rend le controlleur accessible depuis l'élément.
        celluleElt.controlleur = this.getControlleur();
        // Vérifie si la cellule est accessible.
        if (cellule.getAccessible()) {
            // Si c'est une vortex...
            if (Vortex.isPrototypeOf(cellule)) {
                celluleElt.addEventListener("click", function(e) {
                    e.target.controlleur.realiserAction("jouerVortex");
                });
            }
            // C'est donc une cellule vide ou une arme.
            else {
                celluleElt.addEventListener("click", function(e) {
                    var position = e.target.id;
                    e.target.controlleur.realiserAction(
                        "jouerDeplacement",
                        Number(position));
                    });
            }
        }
    }

    return celluleElt;
}

/**
  * Après les avoir supprimé, créer l'ensemble des cellules d'un plateau en
  * utilisant la méthode creerCellule. Les cellules sont groupées par
  * ligne (d'une longueur égale à la largeur du plateau).
  *
  * @param	 {Array}	plateau	    Le plateau du jeu.
  * @returns {void}
  */
Page.dessinerPlateau = function(plateau) {
    if (plateau instanceof Array) {
        // Enlève l'ensemble des cellules.
        var plateauElt = document.getElementById("plateau");
        while(plateauElt.lastChild) {
            plateauElt.removeChild(plateauElt.lastChild);
        }
        var largeur = this.getControlleur().getParametre().LARGEUR_PLATEAU;
        // Ajoute l'ensemble des cellules dans le tableau "plateau".
        for (var i = 0; i < largeur; i++) {
            // Une ligne.
            var ligneElt = document.createElement("tr");
            for (var j = 0; j < largeur; j++) {
                // Calcule la position à partir de i et j.
                var position = i*10 + j;
                // S'il y a un joueur sur la cellule.
                if (plateau[position].length > 1) {
                    var cellule = plateau[position][1]; // le joueur.
                }
                else {
                    var cellule = plateau[position][0]; // la cellule.
                }
                // Créé l'élément à partir de la cellule.
                var celluleElt = this.creerCelluleElt(cellule, position);
                ligneElt.appendChild(celluleElt);
            }
            plateauElt.appendChild(ligneElt);
        }
    }
    else {
        console.log("Operation impossible : argument plateau invalide.");
    }
}
/**
  * Vide un élément identifié par son id.
  *
  * @param	   {String}	  id
  */
Page.viderElt = function(id) {
    var elt = document.getElementById(id);
    while (elt.lastChild) {
        elt.removeChild(elt.lastChild);
    }
}
/**
  * Supprime un élément, identifié par son id, du conteneur.
  *
  * @param	   {String}	  id
  */
Page.supprimerElt = function(id) {
    document.getElementById("conteneur").removeChild(document.getElementById(id));
}

/**
  * Si fin de partie lance dessinerFinPartie et return False. Sinon, supprime
  * l'ensemble de la page. Ajoute :
  *   - l'image du joueur actif,
  *   - la barre de vie des deux joueurs.
  *   - les messages s'il y en a,
  *   - 2 boutons (attaque normal, attaque kamikaze),
  * @param	   {Number}	  codeMessage	    Permet de définir le message.
  * @returns   {Boolean}
  */
Page.dessinerCombat = function(codeMessage=1) {
    // Si on a un message de fin du jeu.
    if (codeMessage === 0) {
        this.dessinerFinPartie();
        return false;
    }
    // Supprime le plateau s'il est encore là (correspond au début du combat).
    if (document.getElementById("plateau")) {
        console.log("Page.dessinerCombat, supprimer le plateau");
        console.log(document.getElementById("plateau"));
        this.supprimerElt("plateau");
    }

    // Vide le div combat (si le combat est déjà entamé).
    if (document.getElementById("combat")) {
        console.log("Page.dessinerCombat, supprimer le combat");
        console.log(document.getElementById("combat"));
        this.viderElt("combat");
        var combatElt = document.getElementById("combat");
    }
    // Créé le div combat qui n'existe pas encore.
    else {
        var combatElt = document.createElement("div");
        combatElt.id = "combat";
        console.log("Page.dessinerCombat, créé le combat");
        console.log(combatElt);
    }

    // Ajoute l'image de combat pour le joueur actif.
    var imgElt = document.createElement("img");
    imgElt.src = this.getControlleur().getMaitreDuJeu().getJoueurActif().getImgCombat();
    combatElt.appendChild(imgElt);
    console.log("Page.dessinerCombat, après ajout image");
    console.log(combatElt);

    // Ajoute les barres de vies pour les deux joueurs.
    var barreElt = document.createElement("div");
    barreElt.classList.add("barre");
    var width;
    var vieJ1Elt = document.createElement("div");
    vieJ1Elt.classList.add("vieJ1");
    width = Math.ceil((this.getControlleur().getJoueurs()[0].getVie() / 100) * 288);
    console.log("page vie J1");
    console.log(width);
    vieJ1Elt.style.width = String(width) + "px";
    var vieJ2Elt = document.createElement("div");
    vieJ2Elt.classList.add("vieJ2");
    width =  Math.ceil((this.getControlleur().getJoueurs()[1].getVie() / 100) * 288);
    console.log("page vie J1");
    console.log(width);
    vieJ2Elt.style.width = String(width) + "px";
    barreElt.appendChild(vieJ1Elt);
    barreElt.appendChild(vieJ2Elt);
    combatElt.appendChild(barreElt);

    // Ajoute le message concernant l'attaque précédente.
    messageElt = document.createElement("p");
    messageElt.classList.add("message");
    // Nom du joueur qui vient d'attaquer.
    var joueurInactif = this.getControlleur().getMaitreDuJeu().getJoueurActif(false).getNom();
    switch (codeMessage) {
        case 1:
            messageElt.textContent  = "Bienvenu dans l'arène les moches !";
            break;
        case 2:
            messageElt.textContent  = "Bien joué " + joueurInactif + ", ton attaque a réussi !";
            break;
        case 3:
            messageElt.textContent  = "Bouuuuh " + joueurInactif + "! Tu t'es foiré...";
            break;
        default:
            console.log("Operation impossible : argument codeMessage invalide.");
    }
    combatElt.appendChild(messageElt);

    // Demande l'action du joueur.
    var joueurActif = this.getControlleur().getMaitreDuJeu().getJoueurActif(true).getNom();
    actionElt = document.createElement("p");
    actionElt.classList.add("message");
    actionElt.textContent = "Qu'est ce que tu veux faire " + joueurActif + " ?";
    combatElt.appendChild(actionElt);

    // Ajoute le bouton attaque normale.
    var attaqueElt = document.createElement("button");
    attaqueElt.classList.add("bouton");
    attaqueElt.textContent = "Attaque normale";
    attaqueElt.id = 1;
    attaqueElt.controlleur = this.getControlleur();
    attaqueElt.addEventListener("click", function(e) {
        // Envoi le choix (stoqué dans id)
        e.target.controlleur.getMaitreDuJeu().gererCombat(e.target.id);
    });
    combatElt.appendChild(attaqueElt);
    // Ajoute le bouton attaque kamimaze.
    var kamikazeElt = document.createElement("button");
    kamikazeElt.classList.add("bouton");
    kamikazeElt.textContent = "Attaque kamikaze";
    kamikazeElt.id = 2;
    kamikazeElt.controlleur = this.getControlleur();
    kamikazeElt.addEventListener("click", function(e) {
        // Envoi le choix (stoqué dans id)
        e.target.controlleur.getMaitreDuJeu().gererCombat(e.target.id);
    });
    combatElt.appendChild(kamikazeElt);

    document.getElementById("conteneur").appendChild(combatElt);
    return true;
}

/**
  * Supprime l'ensemble de la page. Ajoute :
  *   - image Game over.
  *   - bouton reload.
  *
  * @param	   {Number}	  codeMessage	    Permet de définir le message.
  * @returns   {Boolean}
  */
Page.dessinerFinPartie = function() {
    // Supprime l'élément combat.
    this.viderElt("combat");
    var gameOverElt = document.createElement("div");

    // trouve le vainqueur.
    var vainqueur = this.getControlleur().getMaitreDuJeu().trouverVainqueur();

    // Ajoute l'image du vainqueur.
    var imgElt = document.createElement("img");
    imgElt.src = vainqueur.imgVainqueur;
    gameOverElt.appendChild(imgElt);

    // Ajoute message de félicitation.
    var felicitationElt = document.createElement("p");
    felicitationElt.classList.add("gameOver");
    felicitationElt.textContent = "Félicitation " + vainqueur.getNom() + " t'as gagné cette partie !";
    gameOverElt.appendChild(felicitationElt);

    // Ajoute le gameoverElt au div combat.
    var combatElt = document.getElementById("combat");
    combatElt.appendChild(gameOverElt);

    // Lance une nouvelle partie au bout de 3 sec.
    setTimeout(function () {
        window.location.reload(true);
    }, 3000);
}
