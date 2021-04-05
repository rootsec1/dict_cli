const { program } = require('commander');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
const fs = require('fs');
const COMMAND_ENUM = require('../enums/command.enum');
const { getCommandDescription, rectifyAndDisplaySentence } = require('../../util');
const { getThesaurusData } = require('../services/thesaurus.service');
const randomWords = fs.readFileSync('./src/shared/random.words.txt', 'utf-8').split('\n');

const playCommand = program.command('play');
playCommand
    .description(getCommandDescription(COMMAND_ENUM.PLAY))
    .action(onWordInput);

async function game(
    randomResourceIndex,
    selectedResource,
    selectedResourceIndex,
    word,
    resourcesArr,
) {
    while (true) {
        if (selectedResource.length > 0 && selectedResourceIndex < selectedResource.length) {
            switch (randomResourceIndex) {
                case 0:
                    console.log(`Definition: ${resourcesArr[0][selectedResourceIndex]}`);
                    break;
                case 1:
                    console.log(`Synonym: ${resourcesArr[1][selectedResourceIndex]}`);
                    break;
                default:
                    console.log(`Antonym: ${resourcesArr[2][selectedResourceIndex]}`);
                    break;
            }
        } else selectedResourceIndex = 0;
        readline.question('Guess the word', userWord => {
            console.log('You said '+userWord);
            readline.close();
        });
        selectedResourceIndex++;
    }
}

async function onWordInput() {
    try {
        const word = randomWords[Math.floor(Math.random() * randomWords.length)];
        const fullDict = await getThesaurusData(word, COMMAND_ENUM.PLAY);
        const definitions = fullDict['definitions'];
        const synonyms = fullDict['synonyms'];
        const antonyms = fullDict['antonyms'];
        const examples = fullDict['examples'];
        let resourcesArr = [definitions, synonyms, antonyms];
        resourcesArr = resourcesArr.filter(ele => ele.length > 0);
        const randomResourceIndex = Math.floor(Math.random() * resourcesArr.length);
        const selectedResource = resourcesArr[randomResourceIndex];
        const selectedResourceIndex = 0;
        console.log('Let\'s play a game');
        game(randomResourceIndex, selectedResource, selectedResourceIndex, word, resourcesArr);
    } catch (error) {
        if (error instanceof EvalError)
            console.log(error.message);
        else console.error(error);
    }
}

module.exports = playCommand;