// Exercice 1
// Compter le nombre de films par genre
use("db_mflix");
db.movies.aggregate([
    {
        $unwind: "$genres"
    },
    {
        $group: {
            _id: "$genres",
            number: { $count: {} }
        }
    }
]);

// Exercice 2
// Compter le nombre de films par classification (rated)
use("db_mflix");
db.movies.aggregate([
    {
        $group: {
            _id: "$rated",
            number: { $count: {} }
        }
    }
]);

// Exercice 3
// Calculer la durée moyenne des films par genre
use("db_mflix");
db.movies.aggregate([
    {
        $unwind: "$genres"
    },
    {
        $group: {
            _id: "$genres",
            moyenne: { $avg: "$runtime" }
        }
    }
]);

// Exercice 4   TODO
// Calculer la durée moyenne des films par décennie
use("db_mflix");
db.movies.aggregate([
    {
        $match: {
            year: { $type: 'int' }
        }
    },
    {
        $project: {
            _id: 0,
            year: {
                $convert: {
                    input: "$year",
                    to: "int"
                }
            },
            runtime: 1
        }
    },
    {
        $addFields: {
            decennie: { $round: ["$year", -1] }
        }
    },
    {
        $group: {
            _id: "$decennie",
            moyenne: { $avg: "$runtime" }
        }
    }
]);

// Exercice 5
// Calculer la durée moyenne des films par acteur
use("db_mflix");
db.movies.aggregate([
    {
        $unwind: "$cast"
    },
    {
        $group: {
            _id: "$cast",
            moyenne: { $avg: "$runtime" }
        }
    }
]);

// Exercice 6
// Lister les 5 réalisateurs les plus fréquents
use("db_mflix");
db.movies.aggregate([
    {
        $unwind: "$directors"
    },
    {
        $group: {
            _id: "$directors",
            nbApparition: { $count: {} }
        }
    },
    {
        $sort: {
            nbApparition: -1
        }
    },
    {
        $limit: 5
    }
]);

// Exercice 7
//  Lister les 5 acteurs les plus fréquents dans les films « PG-13 »
use("db_mflix");
db.movies.aggregate([
    {
        $match: {
            rated: "PG-13"
        }
    },
    {
        $unwind: "$cast"
    },
    {
        $group: {
            _id: "$cast",
            nbApparition: { $count: {} }
        }
    },
    {
        $sort: {
            nbApparition: -1
        }
    },
    {
        $limit: 5
    }
]);

// Exercice 8
// Quel est le nombre moyen de commentaires par film
use("db_mflix");
db.movies.aggregate([
    {
        $group: {
            _id: null,
            nbComment: { $avg: "$num_mflix_comments" }
        }
    }
]);

// Exercice 9
// Quel est le genre le plus populaire par année
use("db_mflix");
db.movies.aggregate([
    {
        $match: {
            year: { $type: 'int' }
        }
    },
    {
        $unwind: "$genres"
    },
    {
        $group: {
            _id: "$year",
            BestApparition: {$max: "$genres"}
        }
    },
    {
        $sort: {
            BestApparition: -1
        }
    }
]);

// Exercice 10
// Lister les genres distincts des films
use("db_mflix");
db.movies.aggregate([
    {
        $unwind: "$genres"
    },
    {
        $group: {
            _id: null,
            genres: { $addToSet: "$genres" }
        }
    }
]);

// Exercice 11
// Lister les films par décennie avec le nombre total de films par décennie
use("db_mflix");
db.movies.aggregate([
    {
        $match: {
            year: { $type: "number" }
        }
    },
    {
        $addFields: {
            decennie: { $round: ["$year", -1] }
        }
    },
    {
        $group: {
            _id: "$decennie",
            nbFilm: { $count: {} },
            filmTitle: { $push: "$title" }
        }
    },
    {
        $sort: {
            nbFilm: -1
        }
    }
]);

// Exercice 12
// Trouver le genre le plus courant dans chaque pays
use("db_mflix");
db.movies.aggregate([
    {
        $unwind: "$countries",
    },
    {
        $unwind: "$genres",
    },
    {
        $group: {
            _id: "$countries",
            genres: {$addToSet: "$genres"}
        }
    },
    $p
]);