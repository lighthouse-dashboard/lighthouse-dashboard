import program from 'commander';
import executeAll from './execute-all';

require('dotenv').config();

program.parse(process.argv);

executeAll()
    .then(() => {
        process.exit(0);
    });
