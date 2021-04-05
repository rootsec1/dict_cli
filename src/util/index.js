const chalk = require('chalk');
const commandDescriptionDict = require('../shared/commands.metadata.json');

module.exports.getCommandDescription = (commandEnum) => {
    return commandDescriptionDict[commandEnum];
};

module.exports.rectifyAndDisplaySentence = (sentence, index) => {
    sentence = sentence.trim();
    sentence = sentence[0].toUpperCase() + sentence.substring(1);
    console.log(chalk.blueBright(`${index + 1}.`) + ` ${sentence}`);
    sentence = `${index + 1}. ${sentence}`;
    return sentence;
}

module.exports.renderExample = (example, word) => {
    const wordStartIndex = example.indexOf('}') + 1;
    const wordEndIndex = example.lastIndexOf('{');
    const newWord = example.substring(wordStartIndex, wordEndIndex);
    return example
        .replace(`{it}${word}{/it}`, chalk.greenBright(word))
        .replace(`{it}${newWord}{/it}`, chalk.greenBright(newWord));
}