const commandDescriptionDict = require('../shared/commands.metadata.json');

module.exports.getCommandDescription = (commandEnum) => {
    return commandDescriptionDict[commandEnum];
};

module.exports.rectifyAndDisplaySentence = (sentence, index) => {
    sentence = sentence.trim();
    sentence = sentence[0].toUpperCase() + sentence.substring(1);
    sentence = `${index+1}. ${sentence}`;
    console.log(sentence);
    return sentence;
}