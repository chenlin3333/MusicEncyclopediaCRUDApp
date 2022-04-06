//establish connection to postgres database
import { Pool } from 'pg';
const db = new Pool({
 host: '127.0.0.1',
 database: 'MusicEncyclopediaDB',
 user: 'postgres',
 password: 'Pps13564*',
 port: '5432'
});

export function isUserValid(userName, passWord){
    var test = 1;

}