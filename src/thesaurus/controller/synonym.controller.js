const { program } = require('commander');
const chalk = require('chalk');
const COMMAND_ENUM = require('../enums/command.enum');
const { getCommandDescription, rectifyAndDisplaySentence } = require('../../util');
const { getThesaurusData } = require('../services/thesaurus.service');

const synonymCommand = program.command('syn <word>');
synonymCommand
    .description(getCommandDescription(COMMAND_ENUM.SYN))
    .action(onWordInput);

async function onWordInput(word) {
    try {
        const synonyms = await getThesaurusData(word, COMMAND_ENUM.SYN);
        if (synonyms && synonyms.length > 0) {
            console.log('\nSynonyms for ' + chalk.greenBright(word) + ':');
            synonyms.map((synonym, index) => rectifyAndDisplaySentence(synonym, index));
        }
        else console.log(`No synonyms found for ${word}`);
        console.log();
    } catch (error) {
        if (error instanceof EvalError)
            console.log(error.message);
        else console.error(error);
    }
}

module.exports = synonymCommand;