var r = require('rethinkdb')

var connection = null;
r.connect( {host: 'localhost', port: 28015}, function(err, conn) {
    if (err) throw err;
    connection = conn;

    r.dbCreate('tallim').run(connection, function(err, result) {
      r.db('tallim').tableCreate('schools').run(connection, function(err, result) {
        if (err) throw err;
        console.log(JSON.stringify(result, null, 2));
      })
    })
})
