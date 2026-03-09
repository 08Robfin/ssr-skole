-- Active: 1772450267658@@127.0.0.1@5432@postgres
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);

INSERT INTO users (name) VALUES
    ('Jette'),
    ('Carmen'),
    ('Robin');

    CREATE TABLE bilmerker (
    id SERIAL PRIMARY KEY,
    merke VARCHAR(100)
);

INSERT INTO bilmerker (merke) VALUES
    ('Toyota'),
    ('Honda'),
    ('Tesla');

    CREATE TABLE filmer (
    id SERIAL PRIMARY KEY,
    tittel VARCHAR(100) NOT NULL
    );

    CREATE TABLE skuespillere (
    id SERIAL PRIMARY KEY,
    navn VARCHAR(100) NOT NULL
    );

                        INSERT INTO filmer (tittel) VALUES
                        ('The Matrix'),
                        ('The Matrix Reloaded'),
                        ('The Matrix Revolutions');

                    INSERT INTO skuespillere (navn) VALUES
                        ('Keanu Reeves'),
                        ('Laurence Fishburne'),
                        ('Carrie-Anne Moss');


CREATE TABLE skuespiller_i_film (
    film_id INT REFERENCES filmer(id),
    skuespiller_id INT REFERENCES skuespillere(id),
    PRIMARY KEY (film_id, skuespiller_id)
);


INSERT INTO skuespiller_i_film (film_id, skuespiller_id) VALUES 
(1, 1), (2, 1), (3, 1),
(1, 2), (1, 3);         

create table skuespillere (
     id serial primary key,
     navn varchar(100)
);

SELECT skuespillere.navn, filmer.tittel
FROM skuespillere
JOIN skuespiller_i_film ON skuespillere.id = skuespiller_i_film.skuespiller_id
JOIN filmer ON skuespiller_i_film.film_id = filmer.id;


insert into skuespillere (navn) values
   ('Tom Cruise'),
   ('Angelina Jolie'),
   ('Brad Pitt');