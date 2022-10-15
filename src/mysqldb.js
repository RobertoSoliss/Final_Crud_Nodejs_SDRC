import { createConnection } from "mysql2";
import parseDatabaseUrl from "parse-database-url";

import { dbconfig } from "./config.js";

const dbcon = parseDatabaseUrl(dbconfig)

export const db = createConnection(dbcon);

db.connect()