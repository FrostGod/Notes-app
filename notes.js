const fs = require('fs');
const chalk = require('chalk');

const getNotes = function(){
    return "Your Notes ...";
};

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNotes = notes.filter((note) => {
        return note.title === title;
    });

    debugger

    if(duplicateNotes.length === 0){
        notes.push({
            "title": title,
            "body": body
        });
        saveNotes(notes);
        console.log("Note added");
    }
    else{
        console.log("duplicate Note Title exists");
    }
    

};

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try{
        const databuffer = fs.readFileSync('notes.json');
        const datajson = databuffer.toString();
        console.log(datajson);
        return JSON.parse(datajson);
    }catch(err){
        return [];
    }
}

const removeNote = (title)=> {
    const notes = loadNotes();
    console.log(notes);
    // console.log(title);
    const updatedNotes = notes.filter((note) => {
        return !(note.title === title);
    });
    if(updatedNotes.length === notes.length){
        console.log(chalk.red("No Such Title exists"));
    }else{
        console.log(chalk.green("Remove Succesful"));
        saveNotes(updatedNotes);
    }
};

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.green.inverse("Your Notes"));
    notes.forEach( (note) => {
        console.log(note.title);
    });
};

const readNote = (title) => {
    const notes = loadNotes();
    const found = notes.find((note) => {
        return note.title === title;
    });
    if(!found){
        console.log(chalk.red.inverse("No souch title exists"));
    }else{
        console.log(chalk.green(found.title));
        console.log(found.body);
    }
};

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote

};