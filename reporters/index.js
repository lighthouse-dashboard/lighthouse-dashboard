import { register } from '../lib/reporter';
import qm from '../lib/reporter/integrations/quickmetrics';

if (process.env.QUICK_METRICS_KEY) {
    register(qm(process.env.QUICK_METRICS_KEY));
}
