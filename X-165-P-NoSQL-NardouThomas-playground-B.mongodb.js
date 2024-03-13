// 1. Administrateur de db_mflix
//    1.1. Peux créer ou supprimer des collections ;
//    1.2. Peut créer, lire, mettre à jour et supprimer (CRUD) n’importe quels documents des 
//         collections ;
//    1.3. Gérer les indexes pour toutes les collections ;
//    1.4. Gérer les rôles (et donc les utilisateurs) et leurs privilèges de cette base de données
use("db_mflix");
db.createRole({
    // Nom du rôle
    role: "Administrateur",
    // Privileges du rôle
    privileges: [],
    // Priviliges du rôle en fonction d'un rôle
    roles: [
        {
            // Rôle choisis dbOwner car le rôle regroupe toutes les privilèges qui sont demandé (création User/Rôles, Gestion des indexs, Lecture/écriture)
            role: "dbOwner",
            db: "db_mflix"
        }
    ]
});

// 2. Utilisateur
//    2.1. Lire les informations sur les films et les commentaires ;
//    2.2. Ajouter ou supprimer un ou des commentaires.
use("db_mflix");
db.createRole({
    // Nom du rôle
    role: "Utilisateur",
    // Privileges du rôle
    privileges: [
        {
            resource: { db: "db_mflix", collection: "movies" },
            // Privilège permettant de lire les données de la collection "movies"
            actions: ["find"]
        },
        {
            resource: { db: "db_mflix", collection: "comments" },
            // Privilège permettant d'inserer/supprimer de nouvelles donnée dans la collection "comments"
            actions: ["insert", "remove"]
        }
    ],
    // Priviliges du rôle en fonction d'un rôle
    roles: []
});

// 3. Gestionnaire 
//    3.1. Lire les informations sur tous les utilisateurs (pour savoir qui a fait un commentaire) ;
//    3.2. Mettre à jour, lire et supprimer des films ou des commentaires ;
//    3.3. Lire tous les commentaires.
use("db_mflix");
db.createRole({
    // Nom du rôle
    role: "Manager",
    // Privileges du rôle
    privileges: [
        {
            resource: { db: "db_mflix", collection: "users" },
            // Privilège permettant seulement de chercher des données dans la collection "users"
            actions: ["find"]
        },
        {
            resource: { db: "db_mflix", collection: "movies" },
            // Privilège permettant de chercher, de supprimer et d'ajouter des données dans la collection "movies"
            actions: ["find", "remove", "update"]
        },
        {
            resource: { db: "db_mflix", collection: "comments" },
            // Privilège permettant de chercher, de supprimer et d'ajouter des données dans la collection "comments"
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

use("db_mflix");
db.dropRole("Manager");