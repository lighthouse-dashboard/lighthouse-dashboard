import ReportCategory from "@dreipol/lighthouse-runner/dist/Interfaces/ReportCategory";

export interface CircleReportContent {
    [key: string]: any;
    key: string;
    tag: string;
    url: string;
    categories: ReportCategory[];
}
