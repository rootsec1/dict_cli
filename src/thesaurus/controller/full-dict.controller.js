const fs = require('fs');
const chalk = require('chalk');
const COMMAND_ENUM = require('../enums/command.enum');
const { rectifyAndDisplaySentence, renderExample } = require('../../util');
const { getThesaurusData } = require('../services/thesaurus.service');
const randomWords = fs.readFileSync('./src/shared/random.words.txt', 'utf-8').split('\n');

function printResource(resourceArr, resourceType, word) {
    if (resourceArr && resourceArr.length > 0) {
        console.log(chalk.magenta(resourceType[0].toUpperCase() + resourceType.substring(1)));
        resourceArr.map((resource, index) => rectifyAndDisplaySentence(resource, index));
        console.log();
    }
    else console.log(chalk.red(`No ${resourceType} found for ${word}\n`));
}

async function onWordInput(word, isWordOfTheDay = false) {
    try {
        const fullDict = await getThesaurusData(word, COMMAND_ENUM.FULL_DICT);
        const definitions = fullDict['definitions'];
        const synonyms = fullDict['synonyms'];
        const antonyms = fullDict['antonyms'];
        let examples = fullDict['examples'];
        examples = examples.map(renderExample, word);
        if (isWordOfTheDay)
            console.log(`Word of the day = ${chalk.greenBright(word)}`);
        console.log('');
        printResource(definitions, 'definitions', word);
        printResource(synonyms, 'synonyms', word);
        printResource(antonyms, 'antonyms', word);
        printResource(examples, 'examples', word);
    } catch (error) {
        if (error instanceof EvalError)
            await wordOfTheDay();
        else console.error(error);
    }
}

async function wordOfTheDay() {
    const word = randomWords[Math.floor(Math.random() * randomWords.length)];
    await onWordInput(word, true);
}

module.exports.onWordInput = onWordInput;
module.exports.wordOfTheDay = wordOfTheDay;
