
//////////////////////////////////// INDEX ////////////////////////////////////

use("db_mflix");
db.movies.createIndex({ title: "text", fullplot: "text" });

use("db_mflix");
db.comments.createIndex({ text: "text" });

use("db_mflix");
db.users.createIndex({ email: 1 }, { unique: true });


//////////////////////////////////// REQUETES EXEMPLE ////////////////////////////////////

use("db_mflix");
db.users.find({email: /\.com$/});

use("db_mflix");
db.comments.find({ text: /veritatis/ });

use("db_mflix");
db.comments.find({ $text: {$search: "veritatis"} });


//////////////////////////////////// UTILS ////////////////////////////////////
use("db_mflix");
db.movies.getIndexes();

use("db_mflix");
db.comments.dropIndexes();
