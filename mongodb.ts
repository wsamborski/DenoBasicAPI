//mongodb+srv://deno:deno@denocluster.xyszk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

import {MongoClient} from "https://deno.land/x/mongo/mod.ts";
/**
 * Klient bazy danych MongoDB
 */
const client = new MongoClient();

/**
 * Ustanowienie połącznie do bazy Mongo Atlas z wykorzystaniem obiektu
 */
await client.connect({
    db: 'denoProducts',
    tls: true,
    servers: [
      {
        host: 'denocluster-shard-00-01.xyszk.mongodb.net',
        port: 27017,
      },
    ],
    credential: {
      username: 'deno',
      password: 'deno',
      db:"denoProducts",
      mechanism: 'SCRAM-SHA-1',
    },
});

const db=client.database("testProducts");

export default db;