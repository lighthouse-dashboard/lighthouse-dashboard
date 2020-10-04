import { Sites } from '../../shared/types/Sites';

declare namespace Reporter {
    export type Reporter = {
        name: string;

        // Server
        onServerStartup?: () => Promise<void>
        onServerSIGTERM?: () => Promise<void>
        onServerError?: (error: Error) => Promise<void>

        // Misc
        onCleanup?: (collectionName: string, deleteCount: number) => Promise<void>

        // Audit
        onAuditCheck?: () => Promise<void>
        onAuditFailed?: (siteModel: Sites.SiteModel, message: string) => Promise<void>
        onAuditScheduled?: (siteModel: Sites.SiteModel, isScheduled: boolean) => Promise<void>
        onAuditComplete?: (siteModel: Sites.SiteModel, report: Reports.Report, raw: LH.Result) => Promise<void>
    };
}
