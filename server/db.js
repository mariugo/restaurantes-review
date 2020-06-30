const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "postdba",
    port: 5432,
    host: "localhost",
    database: "resdb"
});

module.exports = pool;