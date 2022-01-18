const mysql = require("mysql");
let dbConnection;

// datos de la conexion en el localhost
if (process.env.DBSource === "LOCAL") {
  console.log("trabajando en DB Local");
  dbConnection = mysql.createConnection({
    connectionLimit: 5,
    host: process.env.DBHOST,
    database: process.env.DBNAME,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
  });
} else {
  //datos de la conexion en el servido de Clever Cloud
  dbConnection = mysql.createConnection({
    connectionLimit: 5,
    host: process.env.RDBHOST,
    database: process.env.RDBNAME,
    user: process.env.RDBUSER,
    password: process.env.RDBPASSWORD,
  });
}
module.exports = dbConnection;
