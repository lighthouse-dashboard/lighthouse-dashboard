declare namespace Sites {
    export interface SiteModel {
        id: string;
        name: string;
        url: string;
        device: 'desktop' | 'mobile';
        order: number;
        is_favorite: boolean;
        last_audit: string | null;
        is_scheduled?: boolean;
        thumbnail?: string;
        disabled?: boolean;
    }

    export interface SiteWithReport {
        site: SiteModel;
        report: Reports.Report;
    }
}
