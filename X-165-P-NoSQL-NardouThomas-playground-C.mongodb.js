// Lister tous les films ou séries selon les critères suivants :

// Requete 1
// d'action
use("db_mflix");
db.movies.find({ genres: "Action" });

// Requete 2
// sortis après l’an 2000
use("db_mflix");
db.movies.find({ released: { $gt: new Date(2000, 1, 1) } });

// Requete 3
// réalisés après 2010 mais avant 2020
use("db_mflix");
db.movies.find({ year: { $gt: 2000, $lt: 2010 } });

// Requete 4
// sortis dans les années 2000 mais ayant un style des années 1980
use("db_mflix");
db.movies.find({ plot: { $regex: /1980/ }, released: { $gte: new Date(2000, 1, 1), $lt: new Date(2010, 1, 1) } });

// Requete 5
// réalisés par « Quentin Tarantino »
use("db_mflix");
db.movies.find({ directors: "Quentin Tarantino" });

// Requete 6
// de la série « Star Wars »
use("db_mflix");
db.movies.find({ title: { $regex: /Star Wars/, $options: 'i' } });

// Requete 7
// avec un score « IMDb » supérieur à 8
use("db_mflix");
db.movies.find({ "imdb.rating": { $gt: 8 } });

// Requete 8
// qui ne sont pas de genre « Horror » ou « Sci-Fi »
use("db_mflix");
db.movies.find({ genres: { $nin: ["Horror", "Sci-Fi"] } });

// Requete 9
// ayant exactement 3 différents genres
use("db_mflix");
db.movies.find({ genres: { $size: 3 } });

// Requete 10
// dont le dernier genre est « Drama »
use("db_mflix");
db.movies.find({
    genres: "Drama",
    $expr: {
        $eq: [
            { "$arrayElemAt": ["$genres", -1] },
            "Drama"
        ]
    }
})

// Requete 11
// qui durent entre 1h30 et 2h
use("db_mflix");
db.movies.find({ runtime: { $gte: 78, $lte: 120 } });

// Requete 12
// avec plus de 100 commentaires
use("db_mflix");
db.movies.find({ num_mflix_comments: { $gt: 100 } });

// Requete 13
// qui ne sont pas classés « R »
use("db_mflix");
db.movies.find({ rated: { $ne: "R" } });

// Requete 14
// dont le titre commence par « The »
use("db_mflix");
db.movies.find({ title: { $regex: /^The/ } });

// Requete 15
// ayant reçu un certain nombre d’awards
use("db_mflix");
db.movies.find({ "awards.wins": { $gte: 1 } });

// Requete 16
// où le réalisateur et le premier acteur sont les mêmes
use("db_mflix");
db.movies.find({
    $expr: {
        $eq: [
            { $arrayElemAt: ["$cast", 0] },
            { $arrayElemAt: ["$directors", 0] }
        ]
    }
});

// Requete 17
// dans lesquels « Brad Pitt » et « Angelina Jolie » sont acteurs
use("db_mflix");
db.movies.find({ $and: [{ cast: "Angelina Jolie" }, { cast: "Brad Pitt" }] });

// Requete 18
// dans lesquels « Brad Pitt » est acteur et dont le nombre de commentaires est au 
// moins égal à 100
use("db_mflix");
db.movies.find({ $and: [{ cast: "Brad Pitt", num_mflix_comments: { $gte: 100 } }] });

// Requete 19
// où l’acteur principal est une « femme »
use("db_mflix");
db.movies.find({ cast: { $regex: /^(Mrs\.|Ms\.)/, $options: 'i' } });

// Requete 20
// où « Tom Hanks » est acteur, mais pas « réalisateur »
use("db_mflix");
db.movies.find({ cast: "Tom Hanks", directors: { $nin: ["Tom Hanks"] } });

// Requete 21
// mais doivent apparaître uniquement le titre et l’année de sortie de chaque film
use("db_mflix");
db.movies.find({ cast: "Tom Hanks", directors: { $nin: ["Tom Hanks"] } }, { title: 1, year: 1 });

// Requete 22
// Dans le cadre d’une pagination qui renvoie à chaque fois une liste de 10 films par 
// page, quel est la requête permettant de renvoyer uniquement la liste des films de la 
// 3e page ?
use("db_mflix");
db.movies.find().skip(20).limit(10);

// Requete 23
// Rechercher les films qui ont au moins la langue « française » ou la langue « anglaise »
// disponible, qui sont sortis à partir de « 1980 » inclus, et qui ont une note « Rotten 
// Tomatoe » de plus de 4 ou un score « IMDB » supérieur ou égal à 8. Nous voulons 
// également que « Brad Pitt » joue dans le film. Nous souhaitons n'avoir que les titres 
// pour pouvoir les afficher directement. Enfin, nous ne voulons pas que le « synopsis »
// du film parle de « nazis »
use("db_mflix");
db.movies.find({
    $or: [
        { languages: "English" },
        { languages: "French" },
    ],
    year: { $gte: 1980 },
    $or: [
        { "tomatoes.rotten": { $gt: 4 } },
        { "imdb.rating": { $gte: 8 } },
    ],
    cast: "Brad Pitt",
    plot: {$ne: {$regex: /nazi/, $options: 'i'}}
},
{
    title: 1,
});

// Requete 24
// Nous voulons maintenant trier notre résultat suivant les « notes » attribués au film. 
// D'abord par la note « Rotten Tomatoe », puis par la note « IMDB »
use("db_mflix");
db.movies.find({
    $or: [
        { languages: "English" },
        { languages: "French" },
    ],
    year: { $gte: 1980 },
    $or: [
        { "tomatoes.rotten": { $gt: 4 } },
        { "imdb.rating": { $gte: 8 } },
    ],
    cast: "Brad Pitt",
    plot: {$ne: {$regex: /nazi/, $options: 'i'}}
},
{
    title: 1,
}).sort(
    {"tomatoes.rotten": 1, "imdb.rating": 1},
);

