const DataStore = require('nedb');
const db = new DataStore({ filename: './data/notes.db', autoload: true });

// CRUD = Create, Read, Update, Delete

// GET ohne ID
exports.getAllNotes = (req, res) => {
    db.find({}, (error, data) => {
        res.json(data);
    });
};

// POST ohne ID
exports.addNewNote = (req, res) => {
    db.insert(req.body, (error, data) => {
        res.json(req.body);
    });
}


// GET mit ID
exports.getOneNote = (req, res) => {
    db.findOne({_id: req.params.noteID}, (error, data) => {
        res.json(data);
    });
};


// PUT mit ID
exports.updateOneNote = (req, res) => {
    db.update({_id: req.params.noteID}, req.body, (error, numReplaced) => {
        res.json(numReplaced);
    });
};


// DELETE mit ID
exports.removeOneNote = (req, res) => {
    db.remove({_id: req.params.noteID}, (error, numRemoved) => {
        res.json(numRemoved);
    });
};

