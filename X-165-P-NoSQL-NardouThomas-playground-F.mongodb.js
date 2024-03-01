use("db_mflix");
db.movies.createIndex({genres: 1});

use("db_mflix");
db.movies.createIndex({title: "text", fullplot: "text"});

use("db_mflix");
db.movies.createIndex({title: 1});

use("db_mflix");
db.movies.getIndexes();

use("db_mflix");
db.movies.dropIndexes();
