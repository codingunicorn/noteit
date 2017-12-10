
class NotesAjaxService {

    static GET(note, callback) {
        this.call((note ? '/' + note._id : ''), 'GET', null, callback);
    }

    static POST(note, callback) {
        this.call('', 'POST', note, callback);
    }

    static PUT(note, callback) {
        this.call('/' + note._id, 'PUT', note, callback);
    }

    static DELETE(note, callback) {
        this.call('/' + note._id, 'DELETE', null, callback);
    }

    static call(url, method, body, callback) {
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = () => {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
                callback(JSON.parse(xmlhttp.responseText));
        };

        xmlhttp.open(method, 'http://localhost:3000/api/notes' + url, true);
        xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        xmlhttp.send(JSON.stringify(body));
    }
}


// class NotesLocalStorageService {
//     static GET(note, callback) {
//         let result = window.localStorage.getItem('notes');
//         if (result)
//             callback(JSON.parse(result));
//     }
// }


class NotesService {
    static GetAllNotes(callback) {
        NotesAjaxService.GET(null, callback);
    }
    static GetOneNote(id, callback) {
        NotesAjaxService.GET(new NoteModel({_id: id}), callback);
    }
    static AddNote(note, callback) {
        NotesAjaxService.POST(new NoteModel(note), callback);
    }
    static UpdateNote(note, callback) {
        NotesAjaxService.PUT(note, callback);
    }
    static DeleteNote(note, callback) {
        NotesAjaxService.DELETE(note, callback);
    }
}




