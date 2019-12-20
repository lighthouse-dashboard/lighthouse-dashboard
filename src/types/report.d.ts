export interface Report {
    values: ReportValue[];
    id: string;
    siteId: string;
    createdAt: string;
}

export interface ReportValue {
    id: string;
    value: number;
}
