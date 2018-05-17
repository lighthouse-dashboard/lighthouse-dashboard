import CircleArtifact from "./Artifact";

export default interface Build{
    build_num: number;
    subject: string,
    user: any;
    build_time_millis: number,
    stop_time: number;
    status: string;
    artifacts: CircleArtifact[];
}