
class NoteModel {
    constructor() {
        if (!arguments || arguments.length == 0)
            return;

        this._id = arguments['_id'] || null;
        this.title = arguments['title'] || null;
        this.content = arguments['content'] || null;
        this.duedate = arguments['duedate'] || null;
        this.importance = arguments['importance'] || 1;
        this.finished = arguments['finished'] || false;

    }
}


