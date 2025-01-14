#!/bin/bash

# This script loads each file and creates a mongodb collection named using the file name.
# The Json files must be named 'db_<collection-name>.json' (example: 'db_users.json' become collection 'users')

DB_NAME="dbStreetMonitor"

echo "Importing databases"

for file in /docker-entrypoint-initdb.d/db/*.json
do
    collection=${file##*_}
    collection=${collection%.*}
    echo "Importing file $file in collection $collection"
    mongoimport --host 127.0.0.1 --db $DB_NAME --collection $collection --file $file --jsonArray
done

echo "Imported data in $DB_NAME"
