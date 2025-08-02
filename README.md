

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


CREATE TABLE cities (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  position GEOGRAPHY(POINT, 4326)
);

-- Índice espacial (como SPATIAL INDEX en MySQL)
CREATE INDEX idx_cities_position
ON cities
USING GIST (position);



INSERT INTO cities (name, position)
VALUES
  ('Plaza Javier Heraud', ST_SetSRID(ST_MakePoint(-71.524512, -16.378519), 4326)),
  ('Parque José', ST_SetSRID(ST_MakePoint(-71.523248, -16.379134), 4326)),
  ('Complejo Roosevelt', ST_SetSRID(ST_MakePoint(-71.523524, -16.382442), 4326)),
  ('Parque Eucaliptos', ST_SetSRID(ST_MakePoint(-71.516669, -16.364460), 4326)),
  ('Comisaría', ST_SetSRID(ST_MakePoint(-71.517417, -16.383397), 4326));

SELECT id, name, ST_AsText(position) AS position
FROM cities;


WITH center AS (
  SELECT ST_Centroid(ST_Collect(position::geometry)) AS center_geom
  FROM cities
)
SELECT 
  c.id,
  c.name,
  ST_AsText(c.position::geometry) AS position,
  ST_Distance(c.position, center.center_geom::geography) AS distance_to_center
FROM 
  cities c,
  center
ORDER BY 
  distance_to_center
LIMIT 1;

DISTANCE COMISARIA

SELECT
  c1.name AS desde,
  c2.name AS hacia,
  ST_Distance(
    c1.position::geography,
    c2.position::geography
  ) AS distancia_metros
FROM cities c1
JOIN cities c2 ON c1.name = 'COMISARIA' AND c2.name != 'COMISARIA';


SELECT 
  c2.name,
  ST_Distance(c1.position::geography, c2.position::geography) AS distance_meters
FROM 
  cities c1,
  cities c2
WHERE 
  c1.name = 'COMISARIA'
  AND c2.name != 'COMISARIA'
  AND ST_Distance(c1.position::geography, c2.position::geography) <= 700
ORDER BY 
  distance_meters;























