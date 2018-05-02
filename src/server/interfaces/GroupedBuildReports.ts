import { CircleReportContent } from "./CircleReportContent";

export interface GroupedBuildReports {
    [key: string]: CircleReportContent[]
}
