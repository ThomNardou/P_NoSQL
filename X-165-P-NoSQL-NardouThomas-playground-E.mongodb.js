//Exercice 1
use("db_mflix");
db.movies.find({ title: { $regex: /matrix/, $options: 'i' } });

//Exercice 2
use("db_mflix");
db.movies.find({ title: { $regex: /matrix/, $options: 'i' } });