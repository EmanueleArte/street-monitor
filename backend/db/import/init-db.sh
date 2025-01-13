#!/bin/bash

DB_NAME="dbStreetMonitor"
DB_COLLECTION="users"

echo "Importing databases"

for f in "docker-entrypoint-initdb.d/db/*.json"
do
    mongoimport --host localhost --db $DB_NAME --collection $DB_COLLECTION --file $f
done

echo "Imported data in $DB_NAME"
