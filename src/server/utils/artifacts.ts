import { extname } from 'path';
import CircleArtifact from '../interfaces/Artifact';

export function filterArtifactsByType(type: string, artifacts: CircleArtifact[]): CircleArtifact[] {
    return artifacts.filter(item => {
        return extname(item.path) === `.${type}` ? item : null;
    });
}
