const { program } = require('commander');
const COMMAND_ENUM = require('../enums/command.enum');
const { getCommandDescription, rectifyAndDisplaySentence } = require('../../util');
const { getThesaurusData } = require('../services/thesaurus.service');

const definitionCommand = program.command('def <word>');
definitionCommand
    .description(getCommandDescription(COMMAND_ENUM.DEF))
    .action(onWordInput);

async function onWordInput(word) {
    try {
        const definitions = await getThesaurusData(word, COMMAND_ENUM.DEF);
        if (definitions && definitions.length > 0)
            definitions.map((definition, index) => rectifyAndDisplaySentence(definition, index));
        else console.log(`No definitions found for ${word}`);
    } catch (error) {
        if (error instanceof EvalError)
            console.log(error.message);
        else console.error(error);
    }
}

module.exports = definitionCommand;