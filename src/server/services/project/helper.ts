import {map, compact} from 'lodash';

import {getArtifactsForBuildNum} from '../artifact';
import {Project} from '../../interfaces/Project';
import {filterDreihouseArtifacts} from "../dreihouse/helper";
import {filterArtifactsByType} from "../artifact/helper";

export async function filterSupportedProjects(projects: Project[], branch: string, token: string): Promise<Project[]> {
    const filteredProjectsPromises = map(projects, (async (project: Project) => {
        const artifacts = await getArtifactsForBuildNum(project.lastBuild.build_num, project.vcs, project.username, project.project, token);
        const jsonArtifacts = filterArtifactsByType('json', artifacts);
        const dreihouseArtifacts = filterDreihouseArtifacts(jsonArtifacts);
        if (dreihouseArtifacts.length > 0) {
            return project;
        }
        return null
    }));

    const filteredProjects = await Promise.all(filteredProjectsPromises);
    return compact(filteredProjects);
}
