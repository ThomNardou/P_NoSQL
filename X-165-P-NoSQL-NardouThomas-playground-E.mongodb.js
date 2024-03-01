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
use("db_mflix");
db.movies.find({
    $text: {
        $search: "space -\"mars\"",
        $caseSensitive: false
    }
}, {_id: 0, fullplot: 1, });

// Exercice 5
use("db_mflix");
db.movies.find({
    $text: {
        $search: "\"time travel \"",
        $caseSensitive: false
    }
}, {_id: 0, fullplot: 1, });

// Exercice 6
use("db_mflix");
db.movies.find({
    title: /^inter/i
});