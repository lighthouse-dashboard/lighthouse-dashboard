import RunReport from "@dreipol/dreiguard/bin/RunReport";

export default interface CircleArtifact {
    url: string,
    path: string;
    data?: any | RunReport;
}
