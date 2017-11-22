
class NoteController {

    constructor() {
        this.view = new ModelView(this);
        NotesService.getAllNotes((data) => {
            this.notes = data;
            //console.log('notes in notecontroller', this.notes);

            //-> model-view aufrufen und Notes übergeben
            //  -> handlebar templates ausführen (für alle Notes)

        });

    }


    UpdateNote(note, callback) {
        NotesService.UpdateNote(note, (data) => {
           
        });
    }

 // Add
    // von NewNoteForm ein Note bekommen
    // -> NotesService.AddNote aufrufen und Note übergeben
    //-> model-view aufrufen und Note übergeben

    //  -> handlebar template ausführen (für neues Note)



    AddNote(note) {
        //gets Note from Form
        counter = localStorage.length;
        let tempnote = new Notelike(document.getElementById('title').value, document.getElementById('description').value, document.getElementById('importance').value);
        //saves note in localStorage
        localStorage.setItem(counter, JSON.stringify(tempnote));
        counter++;

    }

   
    // Update
    // von UpdateNoteForm ein Note bekommen
    // -> NotesService.UpdateNote aufrufen und Note übergeben
    //-> model-view aufrufen und Note übergeben
    //  -> handlebar template ausführen (für upgedatetes Note)



    UpdateNote(note) {
        getElementById("notes-template").addEventListener('click', function() {
          
        })
        HTMLButtonElement.getAllNotes;
        
    }

    // Finish

    // von Button ein Note (oder ID) bekommen
    // -> wenn nur ID, dann in this.notes Note suchen
    // finished auf Note ändern
    // -> NotesService.UpdateNote aufrufen und Note übergeben
    //-> model-view aufrufen und Note übergeben
    //  -> handlebar template ausführen (für upgedatetes Note)



    // Delete

    DeleteNote(note) {
        Button.onclick((data) => {
            NotesService.DeleteNote(note);

        }

        )
    }
    // von Button ein Note (oder ID) bekommen

    // -> NotesService.DeleteNote aufrufen und Note (!) übergeben ( {_id: NoteID} )

    //-> model-view aufrufen und NoteID übergeben
    //  -> handlebar template ausführen (für gelöschtes Note) / Code im DOM löschen

}


new NoteController();
