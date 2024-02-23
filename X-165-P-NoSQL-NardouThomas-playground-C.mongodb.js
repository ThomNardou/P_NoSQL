// Requete 1
use("db_mflix");
db.movies.find({ genres: "Action" });

// Requete 2
use("db_mflix");
db.movies.find({ released: { $gt: new Date(2000, 1, 1) } });

// Requete 3
use("db_mflix");
db.movies.find({ year: { $gt: 2000, $lt: 2010 } });

// Requete 4
use("db_mflix");
db.movies.find({ plot: { $regex: /1980/ }, released: { $gte: new Date(2000, 1, 1), $lt: new Date(2010, 1, 1) } });

// Requete 5
use("db_mflix");
db.movies.find({ directors: "Quentin Tarantino" });

// Requete 6
use("db_mflix");
db.movies.find({ title: { $regex: /Star Wars/, $options: 'i' } });

// Requete 7
use("db_mflix");
db.movies.find({ "imdb.rating": { $gt: 8 } });

// Requete 8
use("db_mflix");
db.movies.find({ genres: { $nin: ["Horror", "Sci-Fi"] } });

// Requete 9
use("db_mflix");
db.movies.find({ genres: { $size: 3 } });

// Requete 10
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

use("db_mflix");
db.movies.find({ $expr: { $eq: ["$cast", "$directors"] } });

// Requete 11
use("db_mflix");
db.movies.find({ runtime: { $gte: 78, $lte: 120 } });

// Requete 12
use("db_mflix");
db.movies.find({ num_mflix_comments: { $gt: 100 } });

// Requete 13
use("db_mflix");
db.movies.find({ rated: { $not: /R/ } });

// Requete 14
use("db_mflix");
db.movies.find({ title: { $regex: /^The/ } });

// Requete 15
use("db_mflix");
db.movies.find({ "awards.wins": { $gte: 1 } });

// Requete 16
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
use("db_mflix");
db.movies.find({ $and: [{ cast: "Angelina Jolie" }, { cast: "Brad Pitt" }] });

// Requete 18
use("db_mflix");
db.movies.find({ $and: [{ cast: "Brad Pitt", num_mflix_comments: { $gte: 100 } }] });

// Requete 19
use("db_mflix");
db.movies.find({ cast: { $regex: /^(Mrs\.|Ms\.)/, $options: 'i' } });

// Requete 20
use("db_mflix");
db.movies.find({ cast: "Tom Hanks", directors: { $nin: ["Tom Hanks"] } });

// Requete 21
use("db_mflix");
db.movies.find({ cast: "Tom Hanks", directors: { $nin: ["Tom Hanks"] } }, { title: 1, year: 1 });

// Requete 22
use("db_mflix");
db.movies.find().skip(20);

// Requete 23
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

