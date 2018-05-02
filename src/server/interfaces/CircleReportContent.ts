import { ReportCategory } from "./ReportCategory";

export interface CircleReportContent {
    [key: string]: any;
    key: string;
    tag: string;
    url: string;
    categories: ReportCategory[];
}
