import ReportResult from "@dreipol/lighthouse-runner/dist/Interfaces/ReportResult";

export interface GroupedBuildReports {
    [key: string]: ReportResult[]
}
