import program from 'commander';
import executeAll from './execute-all';
import executeSingle from './execute-single';

require('dotenv').config();

program
    .option('-a, --all', 'output extra debugging')
    .option('-q, --queue', 'Add task to queue')
    .option('-s, --single <id>', 'output extra debugging');

program.parse(process.argv);

if (program.all) {
    executeAll(!!program.queue)
        .then(() => {
            process.exit(0);
        });
}

if (program.single) {
    executeSingle(!!program.queue, program.single)
        .then(() => {
            process.exit(0);
        });
}

