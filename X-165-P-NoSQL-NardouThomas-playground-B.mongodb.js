use("db_mflix");
db.createRole({
    // Nom du rôle
    role: "Administrateur",
    // Privileges du rôle
    privileges: [],
    // Priviliges du rôle en fonction d'un rôle
    roles: [
        {
            role: "dbOwner",
            db: "db_mflix"
        }
    ]
});

use("db_mflix");
db.createRole({
    // Nom du rôle
    role: "Utilisateur",
    // Privileges du rôle
    privileges: [
        {
            resource: { db: "db_mflix", collection: "movies" },
            actions: ["find"]
        },
        {
            resource: { db: "db_mflix", collection: "comments" },
            actions: ["insert", "remove"]
        }
    ],
    // Priviliges du rôle en fonction d'un rôle
    roles: []
});

use("db_mflix");
db.createRole({
    // Nom du rôle
    role: "Manager",
    // Privileges du rôle
    privileges: [
        {
            resource: { db: "db_mflix", collection: "movies" },
            actions: ["find", "remove", "update"]
        },
        {
            resource: { db: "db_mflix", collection: "comments" },
            actions: ["find", "remove", "update"]
        }
    ],
    // Priviliges du rôle en fonction d'un rôle
    roles: []
});



use("db_mflix");
db.createUser({
    user: "admin1",
    pwd: "admin1234",
    roles: [{ role: "Administrateur", db: "db_mflix" }]
});
use("db_mflix");
db.createUser({
    user: "manage1",
    pwd: "manage1234",
    roles: [{ role: "Manager", db: "db_mflix" }]
});
use("db_mflix");
db.createUser({
    user: "user1",
    pwd: "user1234",
    roles: [{ role: "Utilisateur", db: "db_mflix" }]
});

use("db_mflix");
db.getUsers();