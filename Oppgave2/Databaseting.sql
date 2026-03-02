-- Active: 1772450267658@@127.0.0.1@5432@postgres
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);

INSERT INTO users (name) VALUES
    ('Joe Biden'),
    ('Donald Trump'),
    ('Kamala Harris');