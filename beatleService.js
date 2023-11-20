/* eslint-disable no-template-curly-in-string */
// Set up the database connection.

// Using key-value pairs from ElephantSQL
const pgp = require('pg-promise')();

const db = pgp({
  host: process.env.DB_SERVER,
  port: process.env.DB_PORT,
  database: process.env.DB_USER,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Configure the server and its routes.

const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();
router.use(express.json());

app.use(router);
app.listen(port, () => console.log(`Listening on port ${port}`));

// Implement the CRUD operations.

// Mysc. operations.
function returnDataOr404(res, data) {
  if (data == null) {
    res.sendStatus(404);
  } else {
    res.send(data);
  }
}

function readHelloMessage(req, res) {
  res.send('I give you, The Beatle!');
}

// theUser related operations.
function readallUsers(req, res, next) {
  db.many('SELECT * FROM theUser;')
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      next(err);
    });
}

function readtheUser(req, res, next) {
  db.oneOrNone('SELECT * FROM theUser WHERE id=${id}', req.params)
    .then((data) => {
      returnDataOr404(res, data);
    })
    .catch((err) => {
      next(err);
    });
}

function updateUser(req, res, next) {
  db.oneOrNone('UPDATE theUser SET password=${body.password}, username=${body.username} WHERE id=${params.id} RETURNING id', req)
    .then((data) => {
      returnDataOr404(res, data);
    })
    .catch((err) => {
      next(err);
    });
}

// clickTrack related operations.
function readallClickTracks(req, res, next) {
  db.many('SELECT * FROM clicktrack;')
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      next(err);
    });
}

function readaClickTrack(req, res, next) {
  db.oneOrNone('SELECT * FROM clicktrack WHERE id=${id}', req.params)
    .then((data) => {
      returnDataOr404(res, data);
    })
    .catch((err) => {
      next(err);
    });
}

// measure related operations.
function readallMeasures(req, res, next) {
  db.many('SELECT * FROM measure;')
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      next(err);
    });
}

function readaMeasure(req, res, next) {
  db.oneOrNone('SELECT * FROM measure WHERE id=${id}', req.params)
    .then((data) => {
      returnDataOr404(res, data);
    })
    .catch((err) => {
      next(err);
    });
}

// marker related operations.
function readallMarkers(req, res, next) {
  db.many('SELECT * FROM marker;')
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      next(err);
    });
}

function readaMarker(req, res, next) {
  db.oneOrNone('SELECT * FROM marker WHERE id=${id}', req.params)
    .then((data) => {
      returnDataOr404(res, data);
    })
    .catch((err) => {
      next(err);
    });
}

/* Just copied from the example repo, will need to adjust for all out SQL shit
function updatePlayer(req, res, next) {
  db.oneOrNone('UPDATE Player SET email=${body.email},
  name=${body.name} WHERE id=${params.id} RETURNING id', req)
    .then((data) => {
      returnDataOr404(res, data);
    })
    .catch((err) => {
      next(err);
    });
}

function createPlayer(req, res, next) {
  db.one('INSERT INTO Player(email, name) VALUES (${email}, ${name}) RETURNING id', req.body)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      next(err);
    });
}

function deletePlayer(req, res, next) {
  db.oneOrNone('DELETE FROM Player WHERE id=${id} RETURNING id', req.params)
    .then((data) => {
      returnDataOr404(res, data);
    })
    .catch((err) => {
      next(err);
    });
}
*/

router.get('/', readHelloMessage);

router.get('/allUsers', readallUsers);
router.get('/theUser/:id', readtheUser);
router.get('/updateUser/:username/:password', updateUser);

router.get('/allClickTracks', readallClickTracks);
router.get('/aClickTrack/:id', readaClickTrack);

router.get('/allMeasures', readallMeasures);
router.get('/aMeasure/:id', readaMeasure);

router.get('/allMarkers', readallMarkers);
router.get('/aMarker/:id', readaMarker);

/*
router.put('/players/:id', updatePlayer);
router.post('/players', createPlayer);
router.delete('/players/:id', deletePlayer);
*/
