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
            _id: { year: "$year", genres: "$genres" },
            numberApparition: { $count: {} }
        }
    },
    {
        $group: {
            _id: "$_id.year",
            BestApparition: { $first: "$numberApparition" }
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
        $sort: {
            countries: 1
        }
    },
    {
        $unwind: "$countries",
    },
    {
        $sort: {
            genres: 1
        }
    },
    {
        $unwind: "$genres",
    },
    {
        $group: {
            _id: { country: "$countries", genres: "$genres" },
            numberApparition: { $count: {} }
        }
    },
    {
        $group: {
            _id: { pays: "$_id.country" },
            genres: { $first: "$_id.genres" },
            mostPopular: { $first: "$numberApparition" },
        }
    },
    {
        $sort: {
            mostPopular: -1,
        }
    }
]);

// Exercice 13
// Trouver le nombre de films par classification et par décennie
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
            _id: { rated: "$rated", decennie: "$decennie" },
            nbFilm: { $count: {} },
        }
    },
    {
        $sort: {
            decennie: -1
        }
    }
]);

// Exercice 14
// Calculer le nombre total de films et la durée moyenne des films par réalisateur
use("db_mflix");
db.movies.aggregate([
    {
        $unwind: "$directors"
    },
    {
        $group: {
            _id: "$directors",
            avg: { $avg: "$runtime" },
            nbFilm: { $count: {} },
        }
    }
]);

// Exercice 15
// Notre objectif est de créer des groupes par pays. Pour chaque pays, nous voulons 
// créer des groupes de chaque genre et obtenir le nombre de films, la note moyenne 
// des films et la part de marché (nombre de films d'un genre pour un pays / total de 
// films du pays).
use("db_mflix");
db.movies.aggregate([
    {
        $unwind: "$countries"
    },
    {
        $unwind: "$genres"
    },
    {
        $group: {
            _id: { country: "$countries", genres: "$genres" },
            nbFilm: { $count: {} },
            moyenneNote: {$avg: "$imdb.rating"}
        }
    },
    {
        $group: {
            _id: "$_id.country",
            nombreTotalFilm: {$sum: "$nbFilm"},
            genres: {
                $push: {
                    genres: "$_id.genres",
                    nombreFilm: "$nbFilm",
                    moyenneNote: {$round: ["$moyenneNote", 2]}
                }
            },
        }
    },
    {
        $unwind: "$genres"
    },
    {
        $addFields :{
          "genres.partDeMarcher": {$divide: ["$genres.nombreFilm", "$nombreTotalFilm"]}
        }
    },
    {
        $group: {
          _id: "$_id",
          genres: { $push: "$genres" },
          nombreTotalFilm: { $first: "$nombreTotalFilm" }
        }
    }
]);