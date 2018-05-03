import DreiguardReport from "./DreiguardReport";

export default interface CircleArtifact {
    url: string,
    path: string;
    data?: any | DreiguardReport;
}
