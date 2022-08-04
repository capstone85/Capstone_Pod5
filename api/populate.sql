DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
    id          SERIAL PRIMARY KEY,
    email       TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),
    first_name  TEXT NOT NULL,
    last_name   TEXT NOT NULL,
    password    TEXT NOT NULL,
    category    TEXT NOT NULL,
    created_at  TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP NOT NULL DEFAULT NOW()
);


\COPY users(email,password, first_name, last_name,category) FROM './users.csv' DELIMITER ',' CSV HEADER;