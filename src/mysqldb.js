import { createConnection } from "mysql2";
import parseDatabaseUrl from "parse-database-url";

import { dbconfig } from "./config.js";

const dbcon = parseDatabaseUrl(dbconfig)

export const db = createConnection(dbcon);

db.connect()


//----------------------
/*
const mysql = require('mysql2')
export const conexion = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: 'celisSOLIS1027',
    database: 'prueba',


})

conexion.connect((error)=>{

    if(error){
        console.log("Error al conectar la BD")
        return
    }else{
        console.log("Conexión exitosa con la BD")
    }

});
*/