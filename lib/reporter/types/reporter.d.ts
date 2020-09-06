import { Sites } from '../../shared/types/Sites';

declare namespace Reporter {
    export type Reporter = {
        // Server
        onServerStartup?: () => Promise<void>
        onServerSIGTERM?: () => Promise<void>
        onServerError?: () => Promise<void>

        // Misc
        onCleanup?: (name: string, deleteCount: number) => Promise<void>

        // Audit
        onAuditCheck?: () => Promise<void>
        onAuditFailed?: (modelName: string, message: string) => Promise<void>
        onAuditScheduled?: (siteModel: Sites.SiteModel, isScheduled: boolean) => Promise<void>
        onAuditComplete?: (site: Sites.SiteModel, report: Reports.Report, raw: LH.Result) => Promise<void>
    };
}
