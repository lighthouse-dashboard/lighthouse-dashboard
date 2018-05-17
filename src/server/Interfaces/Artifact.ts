import RunReport from "@dreipol/dreiguard/bin/RunReport";
import ReportResult from "@dreipol/lighthouse-runner/dist/Interfaces/ReportResult";

export default interface CircleArtifact {
    url: string,
    path: string;
    data?: ReportResult | RunReport[];
}
