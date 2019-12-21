export interface Report {
    values: ReportValue[];
    id: string;
    siteId: string;
    createdAt: string;
    message: string | null;
}

export interface ReportValue {
    id: string;
    value: number;
}
