#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
CREATE TABLE readyfood (
    id SERIAL PRIMARY KEY,
    name text NOT NULL,
    unit text,
    quantity text,
    location text,
    date_added text,
    expires text,
    meal_type text
);

    GRANT ALL PRIVILEGES ON DATABASE graze TO graze;
EOSQL