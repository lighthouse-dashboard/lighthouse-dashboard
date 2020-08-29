import Quickmetrics from 'quickmetrics';

export default function() {
    if (!process.env.QUICK_METRICS_KEY) {
        return false;
    }

    const qm = new Quickmetrics({
        apiKey: process.env.QUICK_METRICS_KEY,
        maxBatchTime: 30, // max and default set to 60 seconds
        maxBatchSize: 1000, // max and default set to 1000 events per batch
    });

    return (eventName, data) => {
        qm.event(eventName, data);
    };
}
