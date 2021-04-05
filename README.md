# 🔨 dict (Stack Finance Task)

Robust CLI based thesaurus to play with. Focused on code structure and file organisation.

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
