var server = require('./casamestra');

//Start the server
server.start(function() {
    console.info('Info: ', 'Server running at: ', server.info.uri);
});
