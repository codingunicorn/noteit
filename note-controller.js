
class NoteController {

    constructor() {
        NotesService.GetAllNotes((data) => {
            this.notes = data;
            this.notes.forEach((e) => {
            //-> note-view aufrufen und Notes übergeben
            //  -> handlebar templates ausführen (für alle Notes)
                view.writeNote(e);                
            });
        });
    }


    GetNoteById(id) {
    if (id === null) {return new NoteModel();}
      let note = this.notes.find((e) => {return e._id == id;});
      return note;
    }


    // Add
    // von NewNoteForm ein Note bekommen
    // -> NotesService.AddNote aufrufen und Note übergeben
    //-> model-view aufrufen und Note übergeben

    //  -> handlebar template ausführen (für neues Note)


    AddNote(note, callback) {
        // von NewNoteForm ein Note bekommen
        note = new Notelike(document.getElementById('title').value, 
        document.getElementById('description').value, document.getElementById('importance').value, 
        document.getElementById('enddate').value);
        console.log(note);
         // -> NotesService.AddNote aufrufen und Note übergeben
        NotesService.AddNote(note);
    }

   
    // Update
    // von UpdateNoteForm ein Note bekommen
    // -> NotesService.UpdateNote aufrufen und Note übergeben
    //-> model-view aufrufen und Note übergeben
    //  -> handlebar template ausführen (für upgedatetes Note)


    UpdateNote(note) {
    // von UpdateNoteForm ein Note bekommen  
    let note = (document.getElementById('notetitle').value, 
    document.getElementById('description').value, document.getElementById('importance').value, 
    document.getElementById('duedate').value);  
    // NotesService.UpdateNote aufrufen und Note übergeben
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
        //-> model-view aufrufen und Note übergeben

        //  -> handlebar template ausführen (für upgedatetes Note)
    }


    // Delete

    // von Button ein Note (oder ID) bekommen
    DeleteNote(id) {
        let note = this.GetNoteById(id);

        // -> NotesService.DeleteNote aufrufen und Note (!) übergeben ( {_id: NoteID} )
        NotesService.DeleteNote(note);

        //-> model-view aufrufen und NoteID übergeben

        // handlebar template ausführen (für gelöschtes Note) / Code im DOM löschen

    }
}


const controller = new NoteController();
