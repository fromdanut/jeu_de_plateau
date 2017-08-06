/*
    Prototype d'une position.
    Possède deux attribut x,y.
*/

var Position = {
    initPosition: function(x, y) {
        this.setX(x);
        this.setY(y);
    }

    getX: function() {
        return this.x;
    }

    setX: function(x) {
        if (x < 0) {
            this.x = 0;
        }
        else if (x > 9) {
            this.x = 9;
        }
    }

    getY: function() {
        return this.y;
    }

    setY: function(y) {
        if (y < 0) {
            this.y = 0;
        }
        else if (y > 9) {
            this.y = 9;
        }
    }
}
