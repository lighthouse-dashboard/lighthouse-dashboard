import { CircleArtifactInterface } from '../../Interfaces';
import { basename, extname } from 'path';

export function filterArtifactsByType(type: string, artifacts: CircleArtifactInterface[]): CircleArtifactInterface[] {
    return artifacts.filter(item => {
        return extname(item.path) === `.${type}` ? item : null;
    });
}

export function filterDashboardArtifacts(artifacts: CircleArtifactInterface[]) {
    artifacts = filterArtifactsByType('json', artifacts);
    return artifacts.filter((item: CircleArtifactInterface) => {
        if (basename(item.path).indexOf('.dashboard.') !== -1) {
            return item;
        }
        return null;
    });
}