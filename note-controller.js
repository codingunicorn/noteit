
class NoteController {

    constructor() {
        
        //this.notes = NotesService.GetAllNotes();

    NotesService.GetNotes((data) => {
            this.notes = data;
            console.log("hello" + data);
            this.notes.forEach((e) => {
                //-> note-view aufrufen und Notes übergeben
                //  -> handlebar templates ausführen (für alle Notes)
                view.writeNote(e);
                console.log("jetzt schribe mer jede einzeln");
                console.table(e);
            });
        });
    }


    GetNoteById(id) {
        if (id === null) { return new NoteModel(); }
        let note = this.notes.find((e) => { return e._id == id; });
        return note;
    }


    AddNote(callback) {
        // von NewNoteForm ein Note bekommen
        let note = new Notelike(document.getElementById('title').value,
            document.getElementById('description').value, document.getElementById('importance').value,
            document.getElementById('enddate').value);
        console.log(note);
        // -> NotesService.AddNote aufrufen und Note übergeben
        NotesService.AddNote(note);
    }


    UpdateNote(id) {
        // von UpdateNoteForm ein Note bekommen  
        //let note = this.GetNoteById(id);

        let note = new NotelikeId(document.getElementById('notetitle').value,
        document.getElementById('description').value, document.getElementById('importance').value,
        document.getElementById('duedate').value, id);
        // NotesService.UpdateNote aufrufen und Note übergeben
        console.log("jetzt simer im controller update");
        console.log(note);
        NotesService.UpdateNote(note);
    }


    // Finish
    // von Button ein Note (oder ID) bekommen
    finishNote(id) {
        // in this.notes Note suchen
        let note = this.GetNoteById(id);
        // finished auf Note ändern
        note.finished = !note.finished;
        // NotesService.UpdateNote aufrufen und Note übergeben
        NotesService.UpdateNote(note);
    }


    // Delete

    // von Button ein Note (oder ID) bekommen
    DeleteNote(note, id) {
        note = this.GetNoteById(note);
        console.log(note);
        // -> NotesService.DeleteNote aufrufen und Note (!) übergeben ( {_id: NoteID} )
        NotesService.DeleteNote(note);
    }
}


const controller = new NoteController();
