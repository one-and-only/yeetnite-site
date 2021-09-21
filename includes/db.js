import { createConnection} from 'mysql2/promise';

/**
 * Execute a MySQL query against the Yeetnite database
 * @param {string} query - SQL query string
 * @param {Array<string> | null} values - SQL prepared statement values
 */
export async function executeQuery(query, values=null) {
  // initialize a connection
  const db = await createConnection({
    host: process.env.MYSQL_HOST,
    port: 3308,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });
  await db.connect(); // establish an active connection

  return new Promise((resolve, reject) => {
    if (values != null) {
      db.execute(query, values).then(result => {
        resolve(JSON.stringify(result[0]));
      }).catch(err => {
        reject(err);
      });
    } else {
      db.query(query).then(result => {
        resolve(result[0]);
      }).catch(err => {
        reject(err);
      });
    }
  });
}