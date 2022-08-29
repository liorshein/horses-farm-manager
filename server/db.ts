import { Client } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const DATABASE_URL = process.env.DATABASE_URL

export const client = new Client({

    connectionString: DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

export const initDb = async () => {

    await client.connect();

    await client.query(
        `CREATE TABLE IF NOT EXISTS instructors(
            instructor_id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            experience TEXT NOT NULL,
            email TEXT NOT NULL,
            address TEXT NOT NULL,
            phone_number TEXT NOT NULL
        );`
    );

    // await client.query(
    //     `CREATE TABLE IF NOT EXISTS horses(
    //         horse_id SERIAL PRIMARY KEY,
    //         name TEXT NOT NULL,
    //         age INTEGER NOT NULL,
    //         breed TEXT NOT NULL,
    //         assignable BOOLEAN NOT NULL
    //     );`
    // );

    // await client.query(
    //     `CREATE TABLE IF NOT EXISTS socks(
    //         sock_id SERIAL PRIMARY KEY,
    //         model TEXT NOT NULL,
    //         quantity INTEGER NOT NULL,
    //         size INTEGER NOT NULL,
    //         manufacturing_year INTEGER NOT NULL,
    //         location_id INTEGER,
    //         CONSTRAINT fk_location FOREIGN KEY(location_id)
    //         REFERENCES locations(location_id)
    //         ON DELETE SET NULL,
    //         officer_id INTEGER,
    //         CONSTRAINT fk_officer FOREIGN KEY(officer_id)
    //         REFERENCES officers(officer_id)
    //         ON DELETE SET NULL
    //     );`
    // );


    // await client.query(
    //     `CREATE TABLE IF NOT EXISTS locations_history(
    //         location_history_id SERIAL PRIMARY KEY,
    //         arrival_date DATE NOT NULL,
    //         departure_date DATE NOT NULL,
    //         location_id INTEGER,
    //         CONSTRAINT fk_location FOREIGN KEY(location_id)
    //         REFERENCES locations(location_id)
    //         ON DELETE CASCADE,
    //         sock_id INTEGER,
    //         CONSTRAINT fk_sock FOREIGN KEY(sock_id)
    //         REFERENCES socks(sock_id)
    //         ON DELETE CASCADE
    //     );`
    // );

    console.log("create");
}

