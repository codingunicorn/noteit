
class NotesAjaxService {

    static GET(note, callback) {
        //console.log(note._id);
        this.call((note ? '/' + note._id : ''), 'GET', null, callback);
    }

    static GETALL(callback) {
        let notes;
        let url = 'http://localhost:3000/api/notes';
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        console.log('ich bin vorm onload GETALL getalli');
        xhr.onload = function () {
            notes = JSON.parse(xhr.responseText);
            console.log("bitte gib mir de " + notes);
            if (xhr.readyState == 4 && xhr.status == "200") {
                console.table(notes);
                console.log('success');
                //callback(notes);
            }
            else {
                console.error(notes);
                console.log('error');
                //callback(notes);
            }
        }
        xhr.send(null);
        
    }


    static POST(note, callback) {
        //this.call('', 'POST', note, callback);

        let url = 'http://localhost:3000/api/notes';
        let xhr = new XMLHttpRequest();
        console.log(note);
        let json = JSON.stringify(note);
        console.log(json);
        xhr.open("POST", url, true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

        console.log('ich bin vorm onload POST muahaha');
        xhr.onload = function () {
            let notes = JSON.parse(xhr.responseText);
            console.log("bitte gib mir de " + notes);
            if (xhr.readyState == 4 && xhr.status == "200") {
                console.table(notes);
                console.log('success');
                //callback(notes);
            }
            else {
                console.error(notes);
                console.log('error');
                //callback(notes);
            }
        }
        xhr.send(json);
    }


    static PUT(note, callback) {
        console.log("jetzt simer im ajax put");
        console.log(note.id);
        this.call('/' + note.id, 'PUT', note, callback);
    }

    static DELETE(note, callback) {
        //this.call('/' + note._id, 'DELETE', null, callback);
       // console.log("cécile");
       let url = 'http://localhost:3000/api/notes/' + note._id;
       let xhr = new XMLHttpRequest();
       xhr.open("DELETE", url, true);
       console.log('ich bin vorm onload muahaha');
       xhr.onload = function () {
           let notes = JSON.parse(xhr.responseText);
           console.log("bitte gib mir de " + notes);
           if (xhr.readyState == 4 && xhr.status == "200") {
               console.table(notes);
               onsole.log('success');
               //callback(notes);
           }
           else {
               console.error(notes);
               console.log('error');
               //callback(notes);
           }
       }
       xhr.send(null);
    }


    static call(url, method, body, callback) {
        console.log(method);
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = () => {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
                callback(JSON.parse(xmlhttp.responseText));
        }
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

    static GetNotes(callback) {
        NotesAjaxService.GET(null, callback);
    }

    static GetOneNote(note, callback) {
        //NotesAjaxService.GET(new NoteModel({_id: id}), callback);
        NotesAjaxService.GET(note, callback);
    }
    static AddNote(note, callback) {
        NotesAjaxService.POST(note, callback);
    }
    static UpdateNote(note, callback) {
        console.log("jetzt simer im service update");
        console.log(note);
        console.log(note.id);
        NotesAjaxService.PUT(note, callback);
    }
    static DeleteNote(note, callback) {
        NotesAjaxService.DELETE(note, callback);
        console.log("deletenote im service" + note);
    }
}


