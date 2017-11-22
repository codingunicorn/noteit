var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyparser = require('body-parser');
var notesDB = require('./database.js');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

// Dateisystem
app.get('/', express.static(__dirname));
app.route('/:filename').get((req, res) => { res.sendFile(__dirname + '/' + req.params.filename); });
app.route('/handlebars/:filename').get((req, res) => { res.sendFile(__dirname + '/handlebars/' + req.params.filename); });

// REST API
app.route('/api/notes')
.get(notesDB.getAllNotes)
.post(notesDB.addNewNote);

app.route('/api/notes/:noteID')
.get(notesDB.getOneNote)
.delete(notesDB.removeOneNote)
.put(notesDB.updateOneNote);

http.listen(3000, 'localhost', () => {
    console.log('server läuft');
});
