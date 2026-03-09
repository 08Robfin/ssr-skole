// Først bruker vi 'require' for å referere til Express-biblioteket
//  (som ligger i node_modules):
const express = require('express');

// Deretter lager vi en ny instans av Express:
const app = express();
app.use(express.json());

// Vi setter opp en enkel "rute" (route) som svarer på
// forespørsler til rotkatalogen, /:
app.get('/', (req, res) => {
    res.send('Hello, world! Klokken er ' + new Date().toLocaleTimeString());
});

app.get('/api', (req, res) => {
    res.json({ message: 'Hello, World!' });
});



// Så starter vi serveren, som nå lytter på port 3000:
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});



// Først refererer vi til driveren (som ligger i node_modules)
const { Pool } = require('pg');

// Så lager vi en forbindelse til databasen
const pool = new Pool({
  user: 'postgres',
  password: 'mysecretpassword',
  host: 'localhost',
  port: 5432,
});

app.post('/deltagere', async (req, res) => {
    const data = req.body;
    console.log('Lagrer deltager: ', data)
    const query = 'INSERT INTO users (name) VALUES ($1)';
    const values = [data.name];
    await pool.query(query, values);
    console.log('Lagret deltager: ', data)
    res.send('Data lagret');
});

app.get('/deltagere-2', async (req, res) => {
    // Henter data fra databasen:
    const result = await pool.query('SELECT * FROM users');

    // Starter en html-liste:
    let html = "<h1>Deltagere</h1>"
    html += "<ul>"

    // Legger til en <li> for hver rad i databasen:
    for( const row of result.rows ) {
        html += "</li><li>" + row.name + "</li>"
    }

    // Avslutter html-listen og returnerer resultatet:
    html += "</ul>"
    res.send(html);
});

app.get('/deltagere-json', async (req, res) => {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
});

app.get('/bilmerker-json', async (req, res) => {
    const result = await pool.query('SELECT * FROM bilmerker');
    res.json(result.rows);
});

app.use(express.static('public'));
app.get('/bilmerker', async (req, res) => {
    const result = await pool.query('SELECT * FROM bilmerker');

    let html = "<h1>Bilmerker</h1>"
    html += "<ul>"

    for( const row of result.rows ) {
        html += "</li><li>" + row.merke + "</li>"
    }

    html += "</ul>"
    res.send(html);
});

app.get('/skuespillere-og-filmer', async (req, res) => {
    const result = await pool.query('SELECT skuespillere.navn, filmer.tittel FROM skuespillere JOIN skuespiller_i_film ON skuespillere.id = skuespiller_i_film.skuespiller_id JOIN filmer ON skuespiller_i_film.film_id = filmer.id');

    let html = "<h1>Skuespillere og filmer</h1>"
    html += "<ul>"

    for( const row of result.rows ) {
        html += "</li><li>" + row.navn + " spiller i " + row.tittel + "</li>"
    }

    html += "</ul>"
    res.send(html);
});

app.get('/skuespillere-og-filmer-json', async (req, res) => {
    const result = await pool.query('SELECT skuespillere.navn, filmer.tittel FROM skuespillere JOIN skuespiller_i_film ON skuespillere.id = skuespiller_i_film.skuespiller_id JOIN filmer ON skuespiller_i_film.film_id = filmer.id');
    res.json(result.rows);
});

app.get('/skuespillere-json', async (req, res) => {
    const result = await pool.query('SELECT * FROM skuespillere');
    res.json(result.rows);
});


app.post('/skuespillere', async (req, res) => {
    const data = req.body;
    console.log('Lagrer skuespiller: ', data);
    await pool.query('INSERT INTO skuespillere (navn) VALUES ($1)', [data.navn]);
    console.log('Lagret skuespiller: ', data);
    res.send('Data lagret');
});
