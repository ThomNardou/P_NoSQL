use("db_mflix");
db.movies.getIndexes();

// Exercice 1
// Recherche des films contenant le mot-clé « matrix »
use("db_mflix");
db.movies.find({ $text: { $search: "matrix" } });

// Exercice 2
// Recherche tous les films contenant la phase « best movie ever »
use("db_mflix");
db.movies.find({ $text: { $search: "\'best movie ever\'" } });

// Exercice 3
// Recherche des films contenant le terme « war », tout en excluant ceux contenant le 
// terme « world »
use("db_mflix");
db.movies.find({
    $text: {
        $search: "war -\"World\"",
        $caseSensitive: false
    }
});

// Exercice 4
// Trouver des films où la description contient « space » mais pas « mars »
// Il faut créer un index avant (si il existe pas) comme ça la recherche textuelle ce fait sur les deux champs
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
// Trouver des films avec le mot exact « time travel » dans la description
// Il faut créer un index avant (si il existe pas) comme ça la recherche textuelle ce fait sur les deux champs
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
// Rechercher des films avec des mots commençant par « inter » dans le titre
// On ne peut pas faire avec une recherche textuel car elle permet pas d'utiliser du regex
use("db_mflix");
db.movies.find({
    title: /^inter/i
});