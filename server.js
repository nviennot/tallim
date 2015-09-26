const express = require('express')
const morgan = require('morgan')
const app = express()
const config = require('./config.coffee').app_config
const bodyParser = require('body-parser')
const r = require('rethinkdb')
const async = require('async')

app.use(morgan('dev'))
app.use(express.static('priv/static'))
app.use(bodyParser.json())
//The REST routes for "todos".
app.route('/schools')
  .get(listSchools)
app.use(handle404);
app.use(handleError);


function listSchools(req, res, next) {
  r.table('schools').run(req.app.rdb, function(err, cursor) {
    if(err) {
      return next(err);
    }

    //Retrieve all the todos in an array.
    cursor.toArray(function(err, result) {
      if(err) {
        return next(err);
      }

      res.json(result);
    });
  });
}


/*
 * Page-not-found middleware.
 */
function handle404(req, res, next) {
  res.status(404).end('not found');
}

/*
 * Generic error handling middleware.
 * Send back a 500 page and log the error to the console.
 */
function handleError(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({err: err.message});
}

/*
 * Store the db connection and start listening on a port.
 */
function startExpress(connection) {
  app.rdb = connection;
  const port = process.env.PORT || config.express.port
  app.listen(port);
  console.log(`Listening on port ${port}`);
}

/*
 * Connect to rethinkdb, create the needed tables/indexes and then start express.
 * Create tables/indexes then start express
 */
async.waterfall([
  function connect(callback) {
    r.connect(config.rethinkdb, callback);
  },
  function createDatabase(connection, callback) {
    //Create the database if needed.
    r.dbList().contains(config.rethinkdb.db).do(function(containsDb) {
      return r.branch(
        containsDb,
        {created: 0},
        r.dbCreate(config.rethinkdb.db)
      );
    }).run(connection, function(err) {
      callback(err, connection);
    });
  },
  function createTable(connection, callback) {
    //Create the table if needed.
    r.tableList().contains('schools').do(function(containsTable) {
      return r.branch(
        containsTable,
        {created: 0},
        r.tableCreate('schools')
      );
    }).run(connection, function(err) {
      callback(err, connection);
    });
  }
], function(err, connection) {
  if(err) {
    console.error(err);
    process.exit(1);
    return;
  }

  startExpress(connection);
});
