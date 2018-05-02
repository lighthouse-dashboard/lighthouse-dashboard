import { map, compact } from 'lodash';

import { ProjectInterface } from '../../Interfaces';
import { getDashboardArtifacts } from '../artifact';

export async function filterSupportedProjects(projects: ProjectInterface[], branch: string, token: string): Promise<ProjectInterface[]> {
    const filteredProjectsPromises = map(projects, (async (project: ProjectInterface) => {
        const dashboardArtifacts = await getDashboardArtifacts(project.lastBuild, project.vcs, project.username, project.project, token);
        if (dashboardArtifacts.length > 0) {
            return project;
        }
        return null
    }));

    const filteredProjects = await Promise.all(filteredProjectsPromises);
    return compact(filteredProjects);
}