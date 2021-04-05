const { program } = require('commander');
const chalk = require('chalk');
const fs = require('fs');
const COMMAND_ENUM = require('../enums/command.enum');
const { game } = require('../helpers/play.helper');
const { getCommandDescription } = require('../../util');
const { getThesaurusData } = require('../services/thesaurus.service');
const randomWords = fs.readFileSync('./src/shared/random.words.txt', 'utf-8').split('\n');

const playCommand = program.command('play');
playCommand
    .description(getCommandDescription(COMMAND_ENUM.PLAY))
    .action(onWordInput);

async function onWordInput() {
    try {
        const word = randomWords[Math.floor(Math.random() * randomWords.length)];
        const fullDict = await getThesaurusData(word, COMMAND_ENUM.PLAY);
        const definitions = fullDict['definitions'];
        const synonyms = fullDict['synonyms'];
        const antonyms = fullDict['antonyms'];
        let resourcesArr = [definitions, synonyms, antonyms];
        resourcesArr = resourcesArr.filter(ele => ele.length > 0);
        console.log(chalk.magenta('Let\'s play a game'));
        await game(word, resourcesArr);
    } catch (error) {
        if (error instanceof EvalError)
            await onWordInput();
        else console.error(error);
    }
}

module.exports = playCommand;