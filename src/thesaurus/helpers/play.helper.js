const chalk = require('chalk');
const prompt = require('prompt-sync')({ sigint: true });
const fullDictController = require('../controller/full-dict.controller');

async function userWordInput(word, resourcesArr) {
    const userWord = prompt('Guess the word: ').trim();
    if (userWord === word || resourcesArr[1].includes(userWord)) {
        console.log(chalk.green('Congratulations! You guessed it right!'));
        process.exit(0);
    }
    else await secondAttempt(word, resourcesArr);
}

async function secondAttempt(word, resourcesArr) {
    console.log(chalk.red('Wrong answer\n'));
    console.log(chalk.cyan('1.') + ' Try again');
    console.log(chalk.cyan('2.') + ' Hint');
    console.log(chalk.cyan('3.') + ' Quit');
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
            console.log(chalk.green(`The word is ${word}.`));
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

module.exports = { userWordInput, secondAttempt, displayHint, game };