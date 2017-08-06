/*
    Prototype de la carte.
    Possède un attribut carte (array de 10*10) et une fonction placer élément.
*/

var Carte = {
    initCarte: function(dimenssion, pions) {
        this.setCarte(dimenssion, pions);
    }

    getCarte: function() {
        return this.carte;
    }

    setCarte: function() {
        if ((dimenssion instanceof Number) && (dimenssion > 0)) {
            if (pions.prototypeOf(Array)) {
                carte = [];
                nbCase = dimenssion ** 2;
                // Ajoute les pions sur la carte.
                while(pions.length > 0) {
                    carte.push(pions.pop());
                }
            }
            else {
                console.log("Operation impossible : argument pions invalide.");
            }
        }
        else {
            console.log("Operation impossible : argument dimenssion invalide.");
        }
    }

    /*
        Trouver une case de la carte avec une position.
        Permet la forme carte.trouver(position)
    */
    trouver: function(position) {
        if (!position.isPrototypeOf(Position)) {
            console.log("Operation impossible : argument position invalide.");
            return false;
        }
        return this.getCarte()[position.y][position.x];
    }

    /*
        Parcourt une liste et applique une action sur chaque case.
    */
    parcourir: function(action) {
        for (var y = 0; y < this.carte.length; y++ ){
            for (var x = 0; x < this.carte.length; x++ ){
                position = Object.create(Position);
                position.initPostion(x,y);
                action(this.trouver(position));
            }
        }
    }

}
