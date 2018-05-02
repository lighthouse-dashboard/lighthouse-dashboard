import { map, compact } from 'lodash';

import { getDashboardArtifacts } from '../artifact';
import { Project } from '../../interfaces/Project';

export async function filterSupportedProjects(projects: Project[], branch: string, token: string): Promise<Project[]> {
    const filteredProjectsPromises = map(projects, (async (project: Project) => {
        const dashboardArtifacts = await getDashboardArtifacts(project.lastBuild, project.vcs, project.username, project.project, token);
        if (dashboardArtifacts.length > 0) {
            return project;
        }
        return null
    }));

    const filteredProjects = await Promise.all(filteredProjectsPromises);
    return compact(filteredProjects);
}