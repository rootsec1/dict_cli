# 🔨 dict (Stack Finance Task) <a href="https://www.npmjs.com/package/@abhishekwl/dict_cli" target="_blank"><img src="https://img.shields.io/badge/npm-1.0.2-green" alt="NPM Version" /></a>

Robust CLI based thesaurus to play with. Focused on code structure and file organisation.
Built using `commander` (CLI operations) and `chalk` (console coloring). Makes API calls to [dictionaryapi.com](https://dictionaryapi.com/products/api-intermediate-thesaurus) to fetch definitions, synonyms, antonyms and usage examples of a given word.

## 📌 Setup Instructions
- Clone the repo
- Run `yarn`
- Test command by running `dict`
- If the previous command fails, run `npm link` and retry

## 🏗 Usage
```
Usage: dict [options] [command]

Options:
  -v, --version   Displays the current version of the CLI
  -h, --help      display help for command

Commands:
  def <word>      Display definitions of a word
  syn <word>      Display synonyms of a word
  ant <word>      Display antonyms of a word
  ex <word>       Display examples of a word
  play            Let's play a game
  help [command]  display help for command
```

## 📚 Directory Structure
```
.
├── README.md
├── index.js
├── package.json
├── src
│   ├── shared
│   │   ├── commands.metadata.json
│   │   ├── constants.js
│   │   └── random.words.txt
│   ├── thesaurus
│   │   ├── controller
│   │   │   ├── antonym.controller.js
│   │   │   ├── definition.controller.js
│   │   │   ├── example.controller.js
│   │   │   ├── full-dict.controller.js
│   │   │   ├── play.controller.js
│   │   │   └── synonym.controller.js
│   │   ├── enums
│   │   │   └── command.enum.js
│   │   ├── helpers
│   │   │   └── play.helper.js
│   │   └── services
│   │       └── thesaurus.service.js
│   └── util
│       └── index.js
└── yarn.lock
```

## 🚀  Done so far
- Implemented `enums` for command names.
- Separation of concerns, `service` layer deals with API calls, `controller` deals with CLI interaction, `helpers` aid controllers with functions specific to the module.
- `shared` directory contains globally shared resources such as constants and command information.
- Utility functions are stored in `util` directory.
- Error management at every stage with `try/catch` being implemented with various error types at the service level as well as the controller level.
- Minimalist `index.js` entrypoint with necessary imports only.

## 📣 Possible Enhancements
- Fetch API key from environment variables, storing it in code to make testing easier.
- Use jsconfig `paths` to make relative imports easier.
- Implements typescript to ensure types.
- Improve CLI interface (`prettify`).
- Display a friendly `did you mean` message if a command is not found.
- Add autoupdate support to the CLI.
- Add `bash`/`zsh` autocomplete.

## 🌈 Screenshots

1. Definition

![Definition](https://i.ibb.co/186dpSz/Screenshot-2021-04-05-at-11-02-18-PM.png)

2. Synonym

![Synonym](https://i.ibb.co/cY37NWn/Screenshot-2021-04-05-at-11-09-58-PM.png)

3. Antonym

![Antonym](https://i.ibb.co/7SQLvjN/Screenshot-2021-04-05-at-11-12-36-PM.png)

4. Example

![Example](https://i.ibb.co/kQck0t7/Screenshot-2021-04-05-at-11-13-55-PM.png)

5. Full Dictionary

![Full Dict](https://i.ibb.co/TB8mnvK/Screenshot-2021-04-05-at-11-17-23-PM.png)

6. Word of the day

![Word of the day](https://i.ibb.co/kBXyt2B/Screenshot-2021-04-05-at-11-15-46-PM.png)

7. Game

![Play](https://i.ibb.co/rdnhPMf/Screenshot-2021-04-05-at-11-19-37-PM.png)
