const { program } = require('commander');
const prompt = require('prompt-sync')({ sigint: true });
const fs = require('fs');
const COMMAND_ENUM = require('../enums/command.enum');
const { getCommandDescription } = require('../../util');
const fullDictController = require('./full-dict.controller');
const { getThesaurusData } = require('../services/thesaurus.service');
const randomWords = fs.readFileSync('./src/shared/random.words.txt', 'utf-8').split('\n');

const playCommand = program.command('play');
playCommand
    .description(getCommandDescription(COMMAND_ENUM.PLAY))
    .action(onWordInput);

async function userWordInput(word, resourcesArr) {
    const userWord = prompt('Guess the word: ').trim();
    if (userWord === word || resourcesArr[1].includes(userWord)) {
        console.log('Congratulations! You guessed it right!');
        process.exit(0);
    }
    else await secondAttempt(word, resourcesArr);
}

async function secondAttempt(word, resourcesArr) {
    console.log('Wrong answer\n');
    console.log('1. Try again');
    console.log('2. Hint');
    console.log('3. Quit');
    const userInput = Number(prompt('Enter your choice: ').trim());
    switch (userInput) {
        case 1:
            await userWordInput(word, resourcesArr);
            break;

        case 2:
            displayHint(resourcesArr);
            await userWordInput(word, resourcesArr);
            break;
        
        case 3:
            console.log(`The word is ${word}.`);
            await fullDictController.onWordInput(word);
            process.exit(0);
    }
}

function displayHint(resourcesArr) {
    const randomResourceIndex = Math.floor(Math.random() * resourcesArr.length);
    const selectedResource = resourcesArr[randomResourceIndex];
    const selectedResourceIndex = 0;
    if (selectedResourceIndex >= selectedResource.length) selectedResourceIndex = 0;
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
    }
}

async function game(word, resourcesArr) {
    while (true) {
        displayHint(resourcesArr);
        await userWordInput(word, resourcesArr);
    }
}

async function onWordInput() {
    try {
        const word = randomWords[Math.floor(Math.random() * randomWords.length)];
        const fullDict = await getThesaurusData(word, COMMAND_ENUM.PLAY);
        const definitions = fullDict['definitions'];
        const synonyms = fullDict['synonyms'];
        const antonyms = fullDict['antonyms'];
        let resourcesArr = [definitions, synonyms, antonyms];
        resourcesArr = resourcesArr.filter(ele => ele.length > 0);
        console.log('Let\'s play a game');
        await game(word, resourcesArr);
    } catch (error) {
        if (error instanceof EvalError)
            console.log(error.message);
        else console.error(error);
    }
}

module.exports = playCommand;