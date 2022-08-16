\echo 'Delete and recreate clothing db?'
\prompt 'Return for yes or control-C to cancel > ' answer

DROP DATABASE clothing;
CREATE DATABASE clothing;
\connect clothing;

\i clothing-schema.sql

\echo 'Delete and recreate clothing_test db?'
\prompt 'Return for yes or control-C to cancel > ' answer

DROP DATABASE clothing_test;
CREATE DATABASE clothing_test;
\connect clothing_test

\i clothing-schema.sql