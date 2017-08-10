var A = {
    b: null,
    init: function(b) {
        this.b = b;
    },
    update: function() {
        console.log("update in A");
    },

    updateB: function() {
        console.log(this.b.update());
    }
};

var B = {
    init: function(a) {
        this.a = a;
    },
    update: function() {
        console.log("update in B");
    },
};

a = Object.create(A);
b = Object.create(B);

a.init(b);
b.init(a);


console.log("a.updateB");
a.updateB()
