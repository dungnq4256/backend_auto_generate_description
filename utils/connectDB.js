const mysql = require("mysql");
const config = {
    host: process.env.DATABASE_HOST,
    port:process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
};

console.log(process.env.DATABASE_HOST);
exports.createConnection = () => {
    return mysql.createConnection(config);
}