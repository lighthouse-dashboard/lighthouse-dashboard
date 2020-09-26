# @lighthouse-dashboard/reporter

A reporter is a handler for events dispatched by the normal process. See the hooks 
on where you can add your custom reporter, get data, process them and do what ever you want with them
like send emails or integrate a slackbot.

## Create custom reporter
First create a new file somewhere in your project. I'd recommend putting it in `/reporters` or in `/src/reporters` directly in the root directory.
Then implement all the hooks your wan't to consume. List of available hooks is below.
Check out the [Lighthouse](./integrations/lighthouse-dashboard.js) reporter which is used internally to store the reports.
Export all the hooks you wan't to subscribe. Then add a new entry in [/reporters.js](../../reporters.js) by importing your created file and all the hooks
and pass them to the register function.

    import * as lighthouseDashboard from './lib/reporter/integrations/lighthouse-dashboard';
    register(lighthouseDashboard);


Alternatively you can also pass an object directly

    register({
        onAuditComplete: (site) => {
            console.log(site);
        },
    });

## Prebuilt reporters

### Lighthouse-dashboard
This is the default reporter which implements logic used to create audits for a page. If you don't want to store anything,
remove this reporter and create your custom data handler
 
### Quickmetrics
To use the internal quickmetrics reporter you have to provide the env variable
`QUICK_METRICS_KEY` with your API access key 

## Hooks

#### `onServerStartup(): Promise<void>`
Dispatched when the server starts

#### `onServerSIGTERM(): Promise<void>`
Dispatched when a SIGTERM signal is dispatched

#### `onServerError(): Promise<void>`
If any unhandeled error occurs, this event is dispatched

#### `onCleanup(modelName, deletedCount): Promise<void>`
Called, when the cleanup command is completed

**Parameters**
- modelName: `string`
- deletedCount: `number`

#### `onAuditCheck(): Promise<void>`
Called every time, the worker checks if any sites are scheduled

#### `onAuditComplete(siteModel, reportModel, raw): Promise<void>`
Called as soon as a new audit has been completed and all lighthouse data is available

**Parameters**
- siteModel: [Sites.Site](../shared/types/Sites.d.ts)
- reportModel: [Reports.Report](../shared/types/Reports.d.ts)
- raw: [LH.Result](https://github.com/GoogleChrome/lighthouse/blob/c54721a22012d9b0f8c0680338de519bf9d0df8d/types/lhr.d.ts)


#### `onAuditFailed(siteModel, message): Promise<void>`
Called, when an audit is failed

**Parameter**
- siteModel: [Sites.Site](../shared/types/Sites.d.ts)
- message `string`

#### `onAuditScheduled(siteModel, isScheduled): Promise<void>`
Called, when a new site has been scheduled

**Parameter**
- siteModel: [Sites.Site](../shared/types/Sites.d.ts)
- isScheduled: `boolean`

