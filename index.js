#!/usr/bin/env node

const { program } = require('commander');
const { PROGRAM_VERSION } = require('./src/shared/constants');
program.version(PROGRAM_VERSION, '-v, --version', 'Displays the current version of the CLI');

program.parse(process.argv);