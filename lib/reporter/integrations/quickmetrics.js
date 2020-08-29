import Quickmetrics from 'quickmetrics';

export default function(apiKey) {
    const qm = new Quickmetrics({
        apiKey,
    });

    return (eventName, data) => {
        qm.event(eventName, data);
    };
}
