/* eslint-disable no-template-curly-in-string */

/*
beatleService.js
This file contains the code that ties the database to the app for
  The Beatle metronome project.

SQL Tables:
theUser: ID, username, and password
clickTrack: ID, userID, name, and date
Measure: ID, clickTrackID, measureNum, timeSig, tempo, and sound
Marker: ID, clickTrackID, and name

General Operations:
/all_tableName_ :
  gets all listings with all the information from the respective table.

/a_tableName_/:id' : for all tables except theUser,
  gets all information from specific listing using the ID.

/update_tableName_/:id :
  updates all information for respective listing except for ID variables using the ID,

/make_tableName_ :
  creates listing in respective table.

/del_tableName_/:id :
  deletes specific listing using the ID.

Unique Operations:
/theUser/:username/:password :
  gets the ID from specific user using the username and password.

/clickTracksFromUser/:id :
  gets all listings from clickTracks tied to specific user using the user's ID.

/allMeasuresFromClickTrack/:id :
  gets all listings from measure tied to specific clickTrack using the clickTrack's ID.
*/

/* Set up the database connection. */
/* Using key-value pairs from ElephantSQL */
const pgp = require('pg-promise')();
// eslint-disable-next-line import/no-extraneous-dependencies
const cors = require('cors'); // Import the cors module

const db = pgp({
  host: process.env.DB_SERVER,
  port: process.env.DB_PORT,
  database: process.env.DB_USER,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

/* Configure the server and its routes. */
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();
router.use(express.json());

app.use(cors()); // Enable CORS for all routes
app.use(router);
app.listen(port, () => console.log(`Listening on port ${port}`));

/* Implement the CRUD operations. */
/* Mysc. operations. */
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

/* theUser related operations. */
function readallUsers(req, res, next) {
  db.many('SELECT * FROM theuser;')
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      next(err);
    });
}

function readtheUser(req, res, next) {
  db.oneOrNone('SELECT id FROM theuser WHERE username LIKE ${username} AND password LIKE ${password}', req.params)
    .then((data) => {
      returnDataOr404(res, data);
    })
    .catch((err) => {
      next(err);
    });
}

// Updates username and password.
function updateUser(req, res, next) {
  db.oneOrNone('UPDATE theuser SET password=${body.password} AND username=${body.username} WHERE id=${params.id} RETURNING id', req)
    .then((data) => {
      returnDataOr404(res, data);
    })
    .catch((err) => {
      next(err);
    });
}

// Requires username and password.
function createUser(req, res, next) {
  db.one('INSERT INTO theuser(username, password) VALUES (${username}, ${password}) RETURNING id', req.body)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      next(err);
    });
}

function deleteUser(req, res, next) {
  db.oneOrNone('DELETE FROM theuser WHERE id=${id} RETURNING id', req.params)
    .then((data) => {
      returnDataOr404(res, data);
    })
    .catch((err) => {
      next(err);
    });
}

/* clickTrack related operations. */
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

function readallClickTracksFromUser(req, res, next) {
  db.oneOrNone('SELECT clickTrack.* FROM clickTrack JOIN theUser ON clickTrack.userID = theUser.ID WHERE theUser.ID = ${id} ORDER BY clickTrack.name ASC;', [req.params.userID])
    .then((data) => {
      returnDataOr404(res, data);
    })
    .catch((err) => {
      next(err);
    });
}

// Updates name and date.
function updateClickTrack(req, res, next) {
  db.oneOrNone('UPDATE clicktrack SET name=${body.name}, date=${body.date} WHERE id=${params.id} RETURNING id', req)
    .then((data) => {
      returnDataOr404(res, data);
    })
    .catch((err) => {
      next(err);
    });
}

// Requires userID, name, and date.
function createClickTrack(req, res, next) {
  db.one('INSERT INTO clicktrack(userID, name, date) VALUES (${userID}, ${name}, ${date}) RETURNING id', req.body)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      next(err);
    });
}

function deleteClickTrack(req, res, next) {
  db.oneOrNone('WITH DeletedMeasures AS (DELETE FROM Measure WHERE clickTrackID = ${id} RETURNING ID) DELETE FROM clickTrack WHERE ID = ${id} RETURNING ID;', req.params)
    .then((data) => {
      returnDataOr404(res, data);
    })
    .catch((err) => {
      next(err);
    });
}

/* measure related operations. */
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

function readallMeasuresFromClickTrack(req, res, next) {
  db.oneOrNone('SELECT * FROM Measure WHERE clickTrackID = ${id} ORDER BY measure.id ASC;', req.params)
    .then((data) => {
      returnDataOr404(res, data);
    })
    .catch((err) => {
      next(err);
    });
}

// Updates measurenum, timesig, tempo, and sound
function updateMeasure(req, res, next) {
  db.oneOrNone('UPDATE measure SET measurenum=${body.measurenum}, timesig=${body.timesig}, tempo=${body.tempo}, sound=${body.sound} WHERE id=${params.id} RETURNING id', req)
    .then((data) => {
      returnDataOr404(res, data);
    })
    .catch((err) => {
      next(err);
    });
}

// Requires clickTrackID, measurenum, timesig, tempo, and sound.
function createMeasure(req, res, next) {
  db.one('INSERT INTO measure(clickTrackID, measurenum, timesig, tempo, sound) VALUES (${clickTrackID}, ${measurenum}, ${timesig}, ${tempo}, ${sound}) RETURNING id', req.body)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      next(err);
    });
}

function deleteMeasure(req, res, next) {
  db.oneOrNone('DELETE FROM measure WHERE id=${id} RETURNING id', req.params)
    .then((data) => {
      returnDataOr404(res, data);
    })
    .catch((err) => {
      next(err);
    });
}

/* marker related operations. */
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

// Updates name.
function updateMarker(req, res, next) {
  db.oneOrNone('UPDATE marker SET name=${body.name} WHERE id=${params.id} RETURNING id', req)
    .then((data) => {
      returnDataOr404(res, data);
    })
    .catch((err) => {
      next(err);
    });
}

// Requires ClickTrackID and name.
function createMarker(req, res, next) {
  db.one('INSERT INTO marker(clickTrackID, name) VALUES (${clickTrackID}, ${name}) RETURNING id', req.body)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      next(err);
    });
}

function deleteMarker(req, res, next) {
  db.oneOrNone('DELETE FROM marker WHERE id=${id} RETURNING id', req.params)
    .then((data) => {
      returnDataOr404(res, data);
    })
    .catch((err) => {
      next(err);
    });
}

/* Links */
router.get('/', readHelloMessage);

router.get('/allUsers', readallUsers);
router.get('/theUser/:username/:password', readtheUser);
router.get('/updateUser/:id', updateUser);
router.post('/makeUser', createUser);
router.delete('/delUser/:id', deleteUser);

router.get('/allClickTracks', readallClickTracks);
router.get('/aClickTrack/:id', readaClickTrack);
router.get('/clickTracksFromUser/:id', readallClickTracksFromUser);
router.get('/updateClickTrack/:id', updateClickTrack);
router.post('/makeClickTrack', createClickTrack);
router.delete('/delClickTrack/:id', deleteClickTrack);

router.get('/allMeasures', readallMeasures);
router.get('/aMeasure/:id', readaMeasure);
router.get('/allMeasuresFromClickTrack/:id', readallMeasuresFromClickTrack);
router.put('/updateMeasure/:id', updateMeasure);
router.post('/makeMeasure', createMeasure);
router.delete('/delMeasure/:id', deleteMeasure);

router.get('/allMarkers', readallMarkers);
router.get('/aMarker/:id', readaMarker);
router.get('/updateMarker/:id', updateMarker);
router.post('/makeMarker', createMarker);
router.delete('/delMarker/:id', deleteMarker);
