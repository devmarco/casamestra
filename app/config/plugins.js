var plugins = function(server) {
    var goodOptions = {
        reporters: [{
            reporter: require('good-console'),
            events: { log: '*', response: '*' }
        }]
    };

    /**
     * Register plugins to hapi server
     */
    server.register([{
        register: require('good'),
        options: goodOptions
    }], function(err) {
        if (err) {
            throw err;
        }
    });
};

module.exports = {
    init: function(server) {
        plugins(server);
    }
}