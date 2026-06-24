import mysql from "mysql2/promise"
import dotenv from "dotenv"

dotenv.config()

const createDatabase = async () =>{
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    });

    await connection.query(
    `CREATE DATABASE IF NOT EXISTS\`${process.env.DB_NAME}\`;`
    );

    await connection.end();
    console.log(`Banco ${process.env.DB_NAME} criado ou ja existe.`);
}

createDatabase().catch((error) =>{
    console.error('Falha ao criar banco.',error);
    process.exit(1);
});


