const pg = require('pg');
const db = new pg.Pool({
 host: '127.0.0.1',
 database: 'MusicEncyclopediaDB',
 user: 'postgres',
 password: 'Pps13564*',
 port: '5432'
});

try{
    db.query("CREATE TABLE user" + 
        "(userID INT PRIMARY KEY," +
         "userName VARCHAR(26) NOT NULL UNIQUE," +
         "passWord VARCHAR(26) NOT NULL,)");

    db.query("CREATE TABLE musicCollection" + 
         "(musicCollectionID INT PRIMARY KEY," +
          "name VARCHAR(26) NOT NULL," +
          "userID INT," + 
          "FOREIGN KEY (userID) REFERENCES user (userID),)");
 
     db.query("CREATE TABLE composer" + 
         "(composerID INT PRIMARY KEY," +
          "biography TEXT NOT NULL," +
          "name VARCHAR(26) NOT NULL,)");
 
     db.query("CREATE TABLE composition" + 
         "(compositionID INT PRIMARY KEY," +
          "title VARCHAR(26) NOT NULL UNIQUE," +
          "releasedDate DATE NOT NULL," +
          "length FLOAT(4, 2) NOT NULL," +
          "composerID INT," +
          "FOREIGN KEY (composerID) REFERENCES composer (composerID)");
 
     db.query("CREATE TABLE genre" + 
         "(genreID INT PRIMARY KEY," +
          "name VARCHAR(26) NOT NULL UNIQUE,");
 
     db.query("CREATE TABLE userComposer" + 
         "(userComposerID INT PRIMARY KEY," +
          "userID INT," +
          "composerID INT," + 
          "FOREIGN KEY (userID) REFERENCES user (userID)," +
          "FOREIGN KEY (composerID) REFERENCES composer (composerID)");
 
     db.query("CREATE TABLE userComposition" + 
         "(userCompositionID INT PRIMARY KEY," +
          "userID INT," +
          "compositionID INT," + 
          "FOREIGN KEY (userID) REFERENCES user (userID)," +
          "FOREIGN KEY (compositionID) REFERENCES composition (compositionID)");
 
     db.query("CREATE TABLE compositionGenre" + 
         "(compositionGenre INT PRIMARY KEY," +
          "compositionID INT," +
          "genreID INT," + 
          "FOREIGN KEY (compositionID) REFERENCES compostion (compositionID)," +
          "FOREIGN KEY (genreID) REFERENCES genre (genreID)");
 
     db.query("CREATE TABLE musicCollectionComposition" + 
         "(musicCollectionCompositionID INT PRIMARY KEY," +
          "musicCollectionID INT," +
          "compositionID INT," + 
          "FOREIGN KEY (musicCollectionID) REFERENCES musicCollection (musicCollectionID)," +
          "FOREIGN KEY (compositionID) REFERENCES composition (compositionID)");
    
    db.end();
}
catch (err){
    console.error(err);
    db.end();
}


