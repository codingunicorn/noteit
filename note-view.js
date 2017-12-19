
class NoteView {
    constructor() {
        // this.NoteController.Finish(ID);
        //this.NoteController.DeleteNote(id);
    }

    writeNote(Note) {
        //handlebars
        console.log("jetzt bini am write");
        console.log(Note);
        var source = document.getElementById('notes-template2').innerHTML;
        var template = Handlebars.compile(source);
        var container = document.getElementById("notescontainer");
        //fills content into cardtemplate
        var context = { id: Note._id, notetitle: Note.notetitle, content: Note.content, importance: Note.importance, duedate: Note.duedate, finished: Note.finished };
        var html = template(context);
        //notecard is defined as the card that should be duplicated
        var notecard = document.querySelector("div.single-note");
        //new cloned note is defined by cloning the notecard
        var noteclone = notecard.cloneNode(true);
        //here should the notecard be updated with the new note data
        //noteclone.insertAdjacentHTML("beforeend", html);
        noteclone.querySelector("#notes-template").innerHTML = html;
        //the new cloned note is injected in the end of the notescontainer
        container.insertAdjacentElement("beforeend", noteclone);                
    }


    finishNote(id) {
        controller.finishNote(id);
    }


    updateNote(id) {
        console.log("jetzt wämer update");
        console.log(id);
        controller.UpdateNote(id);
    }


    DeleteNote(id) {
        console.log('deleted');
        controller.DeleteNote(id);
    }


    openEditDialog(id) {
        // Note suchen (im Controller)
        let note = controller.GetNoteById(id);
       // let note = controller.GetOneNotebyId(id);

        // Handlebar Template laden
        var source = document.getElementById('dialog-template').innerHTML;
        var template = Handlebars.compile(source);
        var container = document.getElementById("dialog-template");
        //fills content into cardtemplate
        var context = { id: note._id, notetitle: note.notetitle, content: note.content, importance: note.importance, duedate: note.duedate, finished: note.finished };
        var html = template(context);
        container.innerHTML = html;   
        document.querySelector('.dialog-container').classList.add('dialog-container--visible'); 
    }


    closeEditDialog() {
        document.querySelector('.dialog-container').classList.remove('dialog-container--visible');
    }

    
    openNewNote() {
        //opens New Note window 
        window.location.replace("newnote.html");
    };
    
    
    SaveNote() {
        console.log('saved');
        controller.AddNote();
    }


    //onchange function if finished notes are displayed or not
    checkFinished(checkboxElem) {
    if (checkboxElem.checked) {
       
        var x = document.getElementsByClassName('checkednote');
        var i;
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "block";
        }

          } else {
            var x = document.getElementsByClassName('checkednote');
            var i;
            for (i = 0; i < x.length; i++) {
                x[i].style.display = "none";
            }
          }
        }
}

const view = new NoteView();
