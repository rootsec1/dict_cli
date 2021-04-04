const { program } = require('commander');
const COMMAND_ENUM = require('../enums/command.enum');
const { getCommandDescription, rectifyAndDisplaySentence } = require('../../util');
const { getThesaurusData } = require('../services/thesaurus.service');

const antonymCommand = program.command('ant <word>');
antonymCommand
    .description(getCommandDescription(COMMAND_ENUM.ANT))
    .action(onWordInput);

async function onWordInput(word) {
    try {
        const antonyms = await getThesaurusData(word, COMMAND_ENUM.ANT);
        if (antonyms && antonyms.length > 0)
            antonyms.map((antonym, index) => rectifyAndDisplaySentence(antonym, index));
        else console.log(`No antonyms found for ${word}`);
    } catch (error) {
        console.log(error);
        if (error instanceof EvalError)
            console.log(error.message);
        else console.error(error);
    }
}

module.exports = antonymCommand;