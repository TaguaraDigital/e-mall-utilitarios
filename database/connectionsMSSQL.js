const sql = require("mssql");

const dbSettings = {
  server: "25.52.193.199",
  database: "VE-SALAVAN",
  port: 1433,
  user: "sa",
  password: "p@ssw0rd",
  options: {
    encrypt: false, // for azure
    trustServerCertificate: false, // change to true for local dev / self-signed certs
  },
};

const getConnection = async () => {
  try {
    const pool = await sql.connect(dbSettings);
    return pool;
  } catch (error) {
    console.error("No se Conecto y este es el error", error);
  }
};

module.exports = sql;
module.exports = getConnection;
