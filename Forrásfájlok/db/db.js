const mariadb = require("mariadb");

const pool = mariadb.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "ingatlankezelo",
});

module.exports = pool;