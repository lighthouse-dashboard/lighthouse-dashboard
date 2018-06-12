import CircleArtifact from "./Artifact";

export default interface Build{
    build_num: number;
    stop_time: Date;
    status: string;
    subject: string | null,
    user: any | null;
    build_time_millis: number | null,
    artifacts: CircleArtifact[];
}
