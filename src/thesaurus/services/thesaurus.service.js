const fetch = require('node-fetch');
const COMMAND_ENUM = require('../enums/command.enum');
const { THESAURUS_API_ENDPOINT, THESAURUS_API_KEY } = require('../../shared/constants');

function getDefinitions(apiResponse) {
    try {
        if (apiResponse.hasOwnProperty('shortdef'))
            return apiResponse['shortdef'];
        else if (apiResponse['shortdef'].length === 0)
            return [];
    } catch (error) {
        throw new EvalError(`Did you mean ${apiResponse}?`);
    }
}

function getSynonyms(apiResponse) {
    try {
        if (apiResponse.hasOwnProperty('meta') && apiResponse['meta'].hasOwnProperty('syns') && apiResponse['meta']['syns'].length > 0)
            return apiResponse['meta']['syns'][0];
        else if (apiResponse['meta']['syns'].length === 0)
            return [];
    } catch (error) {
        throw new EvalError(`Did you mean ${apiResponse}?`);

    }
}

function getAntonyms(apiResponse) {
    try {
        if (apiResponse.hasOwnProperty('meta') && apiResponse['meta'].hasOwnProperty('ants') && apiResponse['meta']['ants'].length > 0)
            return apiResponse['meta']['ants'][0];
        else if (apiResponse['meta']['ants'].length === 0)
            return [];
    } catch (error) {
        throw new EvalError(`Did you mean ${apiResponse}?`);
    }
}

function getExamples(apiResponse) {
    try {
        if (apiResponse.hasOwnProperty('def') && apiResponse['def'].length > 0) {
            const sseq = apiResponse['def'][0]['sseq'];
            const examples = sseq.map((obj) => {
                return obj[0][1]['dt'][1][1][0]['t'];
            });
            return examples;
        }
    } catch (error) {
        throw new EvalError(`Did you mean ${apiResponse}?`);
    }
}

module.exports.getThesaurusData = async (word, commandEnum) => {
    try {
        let apiResponse = await fetch(
            `${THESAURUS_API_ENDPOINT}/${encodeURI(word)}/?key=${THESAURUS_API_KEY}`
        );
        apiResponse = (await apiResponse.json());
        if (apiResponse.length === 0)
            throw new EvalError('Oops, no results found');

        apiResponse = apiResponse[0];

        switch (commandEnum) {
            case COMMAND_ENUM.DEF:
                return getDefinitions(apiResponse);
                break;

            case COMMAND_ENUM.SYN:
                return getSynonyms(apiResponse);
                break;

            case COMMAND_ENUM.ANT:
                return getAntonyms(apiResponse);
                break;

            case COMMAND_ENUM.EX:
                return getExamples(apiResponse);
                break;

            case COMMAND_ENUM.FULL_DICT:
                const definitions = getDefinitions(apiResponse);
                const synonyms = getSynonyms(apiResponse);
                const antonyms = getAntonyms(apiResponse);
                const examples = getExamples(apiResponse);
                return { definitions, synonyms, antonyms, examples };
                break;

            default:
                throw new TypeError(`Invalid command ${commandEnum}`);
        }
    } catch (error) {
        throw error;
    }
};
