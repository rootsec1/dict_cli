const { program } = require('commander');
const chalk = require('chalk');
const COMMAND_ENUM = require('../enums/command.enum');
const { getCommandDescription, rectifyAndDisplaySentence, renderExample } = require('../../util');
const { getThesaurusData } = require('../services/thesaurus.service');

const exampleCommand = program.command('ex <word>');
exampleCommand
    .description(getCommandDescription(COMMAND_ENUM.EX))
    .action(onWordInput);

async function onWordInput(word) {
    try {
        let examples = await getThesaurusData(word, COMMAND_ENUM.EX);
        if (examples && examples.length > 0) {
            examples = examples.map(renderExample, word);
            console.log('\nExamples for ' + chalk.greenBright(word) + ':');
            examples.map((example, index) => rectifyAndDisplaySentence(example, index));
        }
        else console.log(`No synonyms found for ${word}`);
        console.log();
    } catch (error) {
        if (error instanceof EvalError)
            console.log(error.message);
        else console.error(error);
    }
}

module.exports = exampleCommand;