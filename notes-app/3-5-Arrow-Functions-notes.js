const fs = require('fs')
const chalk = require('chalk')

const getNotes =  () => { 
    return 'Your notes...'
}

// save note to the data store
const addNote = (title, body) => {
    const notes = loadNotes()

    // check if a duplicate title exists
    const duplicateNotes = notes.filter(  (note) => note.title === title)

    if(duplicateNotes.length === 0){
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
    removeNotes : removeNotes
}