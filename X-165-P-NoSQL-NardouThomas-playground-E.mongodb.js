use("db_mflix");
db.movies.getIndexes();

// Exercice 1
use("db_mflix");
db.movies.find({ $text: { $search: "matrix" } });

// Exercice 2
use("db_mflix");
db.movies.find({ $text: { $search: "\'best movie ever\'" } });

// Exercice 3
use("db_mflix");
db.movies.find({
    $text: {
        $search: "war -\"World\"",
        $caseSensitive: false
    }
});

// Exercice 4
//Il faut créer un index avant comme ça la recherche textuelle ce fait sur les deux champs
use("db_mflix");
db.movies.createIndex({ plot: "text", fullplot: "text" });

use("db_mflix");
db.movies.find({
    $text: {
        $search: "space -\"mars\"",
        $caseSensitive: false
    }
});

// Exercice 5
//Il faut créer un index avant (si il existe pas) comme ça la recherche textuelle ce fait sur les deux champs
use("db_mflix");
db.movies.createIndex({ plot: "text", fullplot: "text" });

use("db_mflix");
db.movies.find({
    $text: {
        $search: "\"time travel \"",
        $caseSensitive: false
    }
});

// Exercice 6
use("db_mflix");
db.movies.find({
    title: /^inter/i
});