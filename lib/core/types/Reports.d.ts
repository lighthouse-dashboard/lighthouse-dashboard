declare namespace Reports {
    export interface RawReport {
        raw: string | null;
    }

    export interface Report {
        values: ReportValue[];
        id: string;
        siteId: string;
        createdAt?: string;
        updatedAt?: string;
        message: string | null;
        raw_report_id?: string | null;
    }

    export interface ReportValue {
        id: string;
        value: number;
    }

    export type ReportMeta = {
        message?: string | null;
        git_commit?: string | null;
    }

}
