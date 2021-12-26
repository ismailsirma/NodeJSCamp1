const fs = require('fs')
const chalk = require('chalk')

const getNotes =  () => { 
    return 'Your notes...'
}

// save note to the data store
const addNote = (title, body) => {
    const notes = loadNotes()

    // check if a duplicate title exists
    const duplicateNote = notes.find((note) => note.title === title)

    // if there is no duplicate note then add the note
    // duplicateNote === undefined // same thing
    if(!duplicateNote){
        // insert each note as an object with title and body
        notes.push({
            title : title,
            body : body
        })

        // save 
        saveNotes(notes)
        console.log(chalk.green.inverse("New note added!"))
    } else {
        console.log(chalk.red.inverse("Note title already taken!"))
    }

}

const removeNotes = (title) => {
    const notes = loadNotes()

    const notesToKeep = notes.filter( (note) => note.title !== title)

    if(notes.length > notesToKeep.length){
        console.log(chalk.green.inverse('Note removed!'))
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.red.inverse('Nothing is removed!'))
    }

}

const listNotes = () => {
    const notes = loadNotes()

    console.log(chalk.inverse('Your notes'))

    notes.forEach(note => {
        console.log(note.title)
    })
}

const readNote = (title) => {
    const notes = loadNotes()

    // find the note from the notes array with specific title
    const note = notes.find((note) => note.title === title)

    // check if note is not undifined and has a value
    if(note)
    {
        // print title and body separetely
        console.log(chalk.inverse.green(note.title))
        console.log(chalk.inverse.yellow(note.body))
    } else {
        console.log(chalk.inverse.red('Unable to find any note with the title: ' + title))
    }

}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = function (){
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (error) {
        return []
    }

}

// Export an object with multiple functions as properties 
module.exports = {
    getNotes : getNotes,
    addNote : addNote,
    removeNotes : removeNotes,
    listNotes : listNotes,
    readNote : readNote
}