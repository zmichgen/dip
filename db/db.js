const mySql = require('mysql2');

// создаем подключение к базе данных
let pool = mySql
    .createPool({
        connectionLimit: 5,
        host: 'wcwimj6zu5aaddlj.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 't0aymeem4kcf5mnw',
        database: 'lbyh5ou7lwo25mzz',
        password: 'w7c6rf8i960iq73k',
    })
    .promise();

module.exports = pool;
