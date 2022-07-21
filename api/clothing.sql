\echo 'Delete and recreate clothing db?'
\prompt 'Return for yes or control-C to cancel > ' answer

DROP DATABASE clothing;
CREATE DATABASE clothing;
\connect clothing;

\i clothing-schema.sql