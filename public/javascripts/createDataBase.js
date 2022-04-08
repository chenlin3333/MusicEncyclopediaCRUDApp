import {} from 'dotenv/config';
//establish connection to postgres database
import pkg from 'pg';
const { Pool } = pkg;
const db = new Pool({
    host: '127.0.0.1',
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: process.env.PORT
});

// const variables for all table names
const user = "users"
const musicCollection = "musicCollection"
const composer = "composer"
const composition = "composition"
const genre = "genre"
const userComposer = "userComposer"
const userComposition = "userComposition"
const compositionGenre = "compositionGenre"
const musicCollectionComposition = "musicCollectionComposition"


// Creates all the relation tables that the database needs
try{
    await db.query(`CREATE TABLE IF NOT EXISTS ${user} 
        (userID INT PRIMARY KEY,
         userName VARCHAR(26) NOT NULL UNIQUE,
         passWord VARCHAR(26) NOT NULL)`);

    await db.query(`CREATE TABLE IF NOT EXISTS ${musicCollection}
        (musicCollectionID INT PRIMARY KEY,
         name VARCHAR(26) NOT NULL,
         userID INT REFERENCES ${user} (userID) ON DELETE CASCADE)`);

    await db.query(`CREATE TABLE IF NOT EXISTS ${composer} 
        (composerID INT PRIMARY KEY, 
         biography TEXT NOT NULL,
         name VARCHAR(26) NOT NULL UNIQUE)`);
        
    await db.query(`CREATE TABLE IF NOT EXISTS ${composition}
        (compositionID INT PRIMARY KEY,
         title VARCHAR(26) NOT NULL UNIQUE,
         releasedDate DATE NOT NULL,
         length FLOAT(4) NOT NULL,
         composerID INT REFERENCES ${composer} (composerID) ON DELETE CASCADE)`);

    await db.query(`CREATE TABLE IF NOT EXISTS ${genre}
        (genreID INT PRIMARY KEY,
         name VARCHAR(26) NOT NULL UNIQUE)`);

    await db.query(`CREATE TABLE IF NOT EXISTS ${userComposer} 
        (userComposerID INT PRIMARY KEY,
         userID INT REFERENCES ${user} (userID) ON DELETE CASCADE,
         composerID INT REFERENCES ${composer} (composerID) ON DELETE CASCADE)`);
   
    await db.query(`CREATE TABLE IF NOT EXISTS ${userComposition}
        (userCompositionID INT PRIMARY KEY,
         userID INT REFERENCES ${user} (userID) ON DELETE CASCADE,
         compositionID INT REFERENCES ${composition} (compositionID) ON DELETE CASCADE)`);

    await db.query(`CREATE TABLE IF NOT EXISTS ${compositionGenre}
        (compositionGenre INT PRIMARY KEY,
         compositionID INT REFERENCES ${composition} (compositionID) ON DELETE CASCADE,
         genreID INT REFERENCES ${genre} (genreID) ON DELETE CASCADE)`);
   
    await db.query(`CREATE TABLE IF NOT EXISTS ${musicCollectionComposition}
        (musicCollectionCompositionID INT PRIMARY KEY,
         musicCollectionID INT REFERENCES ${musicCollection} (musicCollectionID) ON DELETE CASCADE,
         compositionID INT REFERENCES ${composition} (compositionID) ON DELETE CASCADE)`);

    db.end();
}
catch (err){
    console.error(err);
    db.end();
}