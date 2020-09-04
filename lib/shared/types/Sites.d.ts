import { Log } from './Log';

declare namespace Sites {
    export interface SiteModel {
        _id: string;
        name: string;
        url: string;
        device: 'desktop' | 'mobile';
        order: number;
        is_favorite: boolean;
        last_audit: string | null;
        is_scheduled?: boolean;
        thumbnail?: string;
        disabled?: boolean;
        is_public: boolean;
        audit_errors: Log.AuditError[]
    }

    export interface SiteWithReport {
        site: SiteModel;
        report: Reports.Report;
    }
}
