import Quickmetrics from 'quickmetrics';

export default function(apiKey) {
    const qm = new Quickmetrics({
        apiKey,
        maxBatchTime: 30, // max and default set to 60 seconds
        maxBatchSize: 1000, // max and default set to 1000 events per batch
    });

    return (eventName, data) => {
        qm.event(eventName, data);
    };
}
