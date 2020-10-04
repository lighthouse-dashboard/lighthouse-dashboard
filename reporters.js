import { register } from './lib/reporter';
import * as lighthouseDashboard from './lib/reporter/integrations/lighthouse-dashboard';
import * as qm from './lib/reporter/integrations/quickmetrics';
import * as cre from './lib/reporter/integrations/console-re';

export default function setup() {
    if (process.env.QUICK_METRICS_KEY) {
        register( qm );
    }

    if (process.env.CONSOLE_RE_CHANNEL) {
        register( cre )
    }

    register( lighthouseDashboard );
}
