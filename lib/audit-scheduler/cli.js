import '../../reporters';
import executeAll from './execute-all';

require('dotenv').config();

executeAll()
    .then(() => {
        process.exit(0);
    });
