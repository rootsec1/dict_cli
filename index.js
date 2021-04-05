#!/usr/bin/env node

const { program } = require('commander');
const { PROGRAM_VERSION } = require('./src/shared/constants');
const {
    onWordInput,
    wordOfTheDay
} = require('./src/thesaurus/controller/full-dict.controller');
require('./src/thesaurus/controller/definition.controller');
require('./src/thesaurus/controller/synonym.controller');
require('./src/thesaurus/controller/antonym.controller');
require('./src/thesaurus/controller/example.controller');
require('./src/thesaurus/controller/play.controller');

async function main() {
    if (process.argv.length === 2) await wordOfTheDay(); // Word of the day
    else {
        program.on('command:*', word => onWordInput(word)); // Full dictionary
        program.version(PROGRAM_VERSION, '-v, --version', 'Displays the current version of the CLI');
        program.parse(process.argv); // Regular flow
    }
}

main();