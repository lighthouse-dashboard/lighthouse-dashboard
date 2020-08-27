export namespace Audits {
    export interface AuditDocument extends Audit {
        asset: string;
        siteId: string;
    }

    export interface Audit {
        runs: Audits.Run[];
        median?: Audits.Run
        _id: string;
    }

    export interface Run {
        timings: Audits.Timing[];
        generatedTime: Date;
        lighthouseVersion: string;
        requestedUrl: string;
        finalUrl: string;
    }

    export interface Timing {
        title: string;
        id: string;
        timing: number;
    }
}
