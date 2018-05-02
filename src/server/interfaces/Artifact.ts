import DreiguardReport from "./DreiguardReportInterface";

export default interface CircleArtifact {
    url: string,
    path: string;
    data?: any | DreiguardReport;
}
