
//////////////////////////////////// INDEX ////////////////////////////////////
use("db_mflix");
db.movies.createIndex({ genres: 1 });

use("db_mflix");
db.movies.createIndex({ title: "text", fullplot: "text" });

use("db_mflix");
db.comments.createIndex({ text: "text" });

use("db_mflix");
db.users.createIndex({ email: 1 }, { unique: true });


//////////////////////////////////// REQUETES EXEMPLE ////////////////////////////////////

use("db_mflix");
db.users.find({email: /\.com$/}).explain('executionStats');


use("db_mflix");
db.comments.find({ text: /veritatis/ }).explain('executionStats');
use("db_mflix");
db.comments.find({ $text: {$search: "veritatis"} });


//////////////////////////////////// UTILS ////////////////////////////////////
use("db_mflix");
db.comments.getIndexes();

use("db_mflix");
db.comments.dropIndexes();
