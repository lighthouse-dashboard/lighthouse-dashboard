declare namespace Reports {
    export interface Report {
        values: ReportValue[];
        id: string;
        siteId: string;
        createdAt?: string;
        updatedAt?: string;
        message: string | null;
        hasRawData?: boolean;
    }

    export interface ReportValue {
        id: string;
        value: number;
    }
}
