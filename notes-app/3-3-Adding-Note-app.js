const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./3-3-Adding-Note-notes')

// customize yargs version
yargs.version('1.1.0')

// Create add command
yargs.command({
    command : 'add',
    describe: 'Add a new note',
    builder : {
        title: {
            describe:'Note title',
            demandOption : true,  // make title required
            type: 'string' // force title to be string
        },
        body : {
            describe:'Note body',
            demandOption : true,  // make body required
            type: 'string' // force body to be string
        }
    },
    handler: function (argv) {
        notes.addNote(argv.title, argv.body)
    }
})

// Create remove command
yargs.command({
    command : 'remove',
    describe: 'Remove a note',
    handler: function () {
        console.log('Removing the note!')
    }
})

// Create read command
yargs.command({
    command : 'read',
    describe: 'Reading a note',
    handler: function () {
        console.log('Reading a note')
    }
})

// Create list command
yargs.command({
    command : 'list',
    describe: 'List your notes',
    handler: function () {
        console.log('Listing out all notes!')
    }
})

// arguments will be printed only once
yargs.parse()

//console.log(yargs.argv)