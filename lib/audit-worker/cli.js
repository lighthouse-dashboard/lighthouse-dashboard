import '../../reporters';
import { report } from '../reporter';
import { SERVER_ERROR } from '../reporter/Events';
import index from './index';

index()
    .catch(() => {
        return report(SERVER_ERROR);
    })
    .finally(() => {
        process.exit(0);
    });
