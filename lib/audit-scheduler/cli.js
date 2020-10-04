import '../../reporters';
import { report } from '../reporter';
import { SERVER_ERROR } from '../reporter/Events';
import executeAll from './execute-all';

executeAll()
    .catch((e) => {
        return report(SERVER_ERROR, e);
    })
    .finally(() => {
        process.exit(0);
    });
