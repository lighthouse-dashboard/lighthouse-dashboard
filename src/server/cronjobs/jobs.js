const promiseSerial = funcs =>
    funcs.reduce((promise, func) =>
            promise.then(result =>
                func().then(Array.prototype.concat.bind(result))),
        Promise.resolve([]))

export default [
    {
        name: 'run-audits',
        schedule: '*/15 * * * *',
        handler: () => {

        },
    },
]
