

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## ROLES 

ADMIN
administrador
OFFICER
oficial
CITIZEN
cuidadano

https://firebasestorage.googleapis.com/v0/b/rpiimage-b6062.appspot.com/o/worker.png?alt=media&token=146c5481-e90e-4640-ad33-79095411b937

routes

/roles/admin
/roles/officer
/roles/citizen



# RUN DOCKER WITH POSTGRES
```bash
$ docker-compose up -d
$ docker-compose down
$ docker-compose logs -f postgres
$ docker-compose exec postgres bash
$ psql -h localhost my_db -U root
$ docker ps --> get ip
$ docker inspect 8af0f7ea32ab ->172.18.0.3
```

# RUN POSGRESQL

```bash
$ http://localhost:5050/
$ user: root@admin.com
$ password: char5524
$ Servers -> Register -> Server 
$ Name -> my_db General -> postgres:13  "IPAddress": "172.18.0.3",
hostname -I
```


```json
{
    "id":"ADMIN",
    "name":"administrador",
    "image":"https://firebasestorage.googleapis.com/v0/b/rpiimage-b6062.appspot.com/o/worker.png?alt=media&token=146c5481-e90e-4640-ad33-79095411b937",
    "route":"/roles/admin"
}


{
    "id":"OFFICER",
    "name":"oficial",
    "image":"https://firebasestorage.googleapis.com/v0/b/rpiimage-b6062.appspot.com/o/worker.png?alt=media&token=146c5481-e90e-4640-ad33-79095411b937",
    "route":"/roles/officer"
}


{
    "id":"CITIZEN",
    "name":"ciudadano",
    "image":"https://firebasestorage.googleapis.com/v0/b/rpiimage-b6062.appspot.com/o/worker.png?alt=media&token=146c5481-e90e-4640-ad33-79095411b937",
    "route":"/roles/citizen"
}
```