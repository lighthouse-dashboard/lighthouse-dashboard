import { basename, extname } from 'path';
import CircleArtifact from '../../interfaces/Artifact';

export function filterArtifactsByType(type: string, artifacts: CircleArtifact[]): CircleArtifact[] {
    return artifacts.filter(item => {
        return extname(item.path) === `.${type}` ? item : null;
    });
}

export function filterDashboardArtifacts(artifacts: CircleArtifact[]) {
    artifacts = filterArtifactsByType('json', artifacts);
    return artifacts.filter((item: CircleArtifact) => {
        if (basename(item.path).indexOf('.dashboard.') !== -1) {
            return item;
        }
        return null;
    });
}