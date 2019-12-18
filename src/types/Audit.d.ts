export interface AuditDocument extends Audit{
    asset: string;
}

export interface Audit {
    runs: Run[];
    median?: Run
    _id:  string;
}

export interface Run {
    timings:           Timing[];
    generatedTime:     Date;
    lighthouseVersion: string;
    requestedUrl:      string;
    finalUrl:          string;
}

export interface Timing {
    title:  string;
    id:     string;
    timing: number;
    color:  string;
}
