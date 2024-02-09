# P_NoSQL
Un repos contant l'avancé de mon projet NoSQL

## Point A :

Commande : 

```bash
docker exec -i mongo mongorestore --uri=mongodb://root:admin@localhost:27017 --authenticationDatabase=admin --gzip --archive=/backupdb/db_mflix.gz
```

## Point G :

Commande :

```bash
docker exec -i mongo mongodump --uri=mongodb://root:admin@localhost:27017 --authenticationDatabase=admin --db=db_mflix --gzip --archive=/backupdb/db_mflix.gz
```