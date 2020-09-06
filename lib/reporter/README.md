# @lighthouse-dashboard/reporter

## Create custom reporter
First create a new file somewhere in your project. I'd recommend putting it in `/src/reporters` or in `/reporters` directly in the root directory.
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

### Server hooks
#### `onServerStartup(): Promise<void>`
#### `onServerSIGTERM(): Promise<void>`
#### `onServerError(): Promise<void>`

### Misc hooks
#### `onCleanup(modelName, deletedCount): Promise<void>`
- modelName: `string`
- deletedCount: `number`

### Audit hooks
#### `onAuditCheck(): Promise<void>`

#### `onAuditComplete(siteModel, reportModel, raw): Promise<void>`
- siteModel: [Sites.Site](../shared/types/Sites.d.ts)
- reportModel: [Reports.Report](../shared/types/Reports.d.ts)
- raw: [LH.Result](https://github.com/GoogleChrome/lighthouse/blob/c54721a22012d9b0f8c0680338de519bf9d0df8d/types/lhr.d.ts)

Called as soon as a new audit has been completed and all lighthouse data is available

#### `onAuditFailed(siteModel, message): Promise<void>`
- siteModel: [Sites.Site](../shared/types/Sites.d.ts)
- message `string`

#### `onAuditScheduled(siteModel, isScheduled): Promise<void>`
- siteModel: [Sites.Site](../shared/types/Sites.d.ts)
- isScheduled: `boolean`

