import CircleArtifact from "../interfaces/Artifact";

export function filterDreihouseArtifacts(artifacts: CircleArtifact[]): CircleArtifact[] {
     return artifacts.filter((artifact: CircleArtifact) => {
        return (artifact.path.indexOf('.dashboard.') !== -1);
    })
}
