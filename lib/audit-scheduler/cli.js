import '../../reporters';
import { report } from '../reporter';
import { SERVER_ERROR } from '../reporter/Events';
import executeAll from './execute-all';

executeAll()
    .catch(() => {
        return report(SERVER_ERROR);
    })
    .finally(() => {
        process.exit(0);
    });
