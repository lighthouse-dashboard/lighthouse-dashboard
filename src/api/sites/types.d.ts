declare namespace Sites {
    export interface SiteConfig {
        id: string;
        name: string;
        url: string;
        device: 'desktop' | 'mobile';
        order: number;
        is_favorite: boolean;
        last_audit: string | null;
        is_scheduled?: boolean;
    }

    export interface SiteWithReport {
        site: SiteConfig;
        report: Reports.Report;
    }
}
