var Entity = {
    initDocumentWriter: function(kernel) {
        this.setKernel(kernel);
    }

    getKernel: function() {
        return this.kernel;
    }

    setKernel: function(kernel) {
        //
        if (true) {
            this.kernel = kernel;
        }
        else {
            console.log("Operation impossible : argument kernel invalide.");
        }
    }
