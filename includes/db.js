const mysql = require('mysql');

/**
 * Create a MySQL connection against the Yeetnite database
 */
function createConnection() {
  return mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: 3308,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });
}

/**
 * Execute a MySQL query against the Yeetnite database
 * @param {string} query - SQL query string
 * @param {Array<string>|null} values - SQL prepared statement values
 * @param {function} cb - Callback function that handles data from the response
 */
export function executeQuery(query, values=null, cb) {
  let map = new Map();
  // Initialize the database access
  const db = createConnection();

  /**
  * Set the map values with the data from the SQL query
  * 
  * ¹Received from the query
  * @param {any} err_cb - Error (if applicable)¹
  * @param {any} fields_cb - Rows of data (if applicable)¹
  */
  function setMap(err_cb, fields_cb) {
    map.set("error", err_cb); map.set("fields", fields_cb);
    cb(map);
    return map;
  }

  function queryDB(err, db) {
    err && setMap(`Connection Error:\n\n${JSON.stringify(err)}`, null);
    (values != null) ? db.query(query, values, (err, fields) => setMap(err, fields)) : db.query(query, (err, fields) => setMap(err, fields));
  }

  /**
   * Make a connection to the Yeetnite database, given the access interface
   * @param  {mysql.Connection} db - Database access interface
   */
  function connectDB(db) {
    db.connect(function(err) {
      queryDB(err, db);
    });
  }
  
  connectDB(db);
}