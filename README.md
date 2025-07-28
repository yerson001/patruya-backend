

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
    "name":"ADMINISTRADOR",
    "image":"https://firebasestorage.googleapis.com/v0/b/rpiimage-b6062.appspot.com/o/admin.png?alt=media&token=25ec32c0-a288-4455-bfea-a159c9054c57",
    "route":"admin/home"
}


{
    "id":"OFFICER",
    "name":"OFICIAL DE POLICIA",
    "image":"https://firebasestorage.googleapis.com/v0/b/rpiimage-b6062.appspot.com/o/officer.png?alt=media&token=e98c58a6-0d4a-4093-b59b-df51c6d2722c",
    "route":"officer/home"
}


{
    "id":"CITIZEN",
    "name":"CIUDADANO",
    "image":"https://firebasestorage.googleapis.com/v0/b/rpiimage-b6062.appspot.com/o/citizen.png?alt=media&token=5dd9c858-e4c5-454d-85f9-bc791c093be6",
    "route":"citizen/home"
}
```

```bash
ssh root@104.225.141.191

npm install
npm run build

nano ecosystem.config.js
module.exports = {
  apps: [
    {
      name: "patruya-backend",
      script: "dist/main.js",
      instances: 1,
      exec_mode: "fork",
      watch: false,
      env: {
        NODE_ENV: "production"
      }
    }
  ]
};
pm2 start ecosystem.config.js
pm2 save
pm2 startup
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u root --hp /root
pm2 status

pm2 logs patruya-backend

```