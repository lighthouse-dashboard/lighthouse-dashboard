import {buildChartDataFromTaggedResults, groupResultsByReportTag} from "../utils/chart";
import CircleArtifact from "../interfaces/Artifact";
import {CircleReportContent} from "../interfaces/CircleReportContent";
import ArtifactService from "./ArtifactService";
import Build from "../interfaces/Build";

export default class DreihouseService {
    artifactService: ArtifactService;

    constructor(artifactService: ArtifactService) {
        this.artifactService = artifactService;
    }

    public  filterArtifacts(artifacts: CircleArtifact[]): CircleArtifact[] {
        return artifacts.filter((artifact: CircleArtifact) => {
            return (artifact.path.indexOf('.dashboard.') !== -1);
        })
    }

    private async getArtifactsWithData(buildNumber: number, vcs: string, username: string, project: string, token: string): Promise<CircleArtifact[]> {
        const artifacts = await this.artifactService.getArtifactsForBuildNum(buildNumber, vcs, username, project, token);
        const jsonArtifacts = this.artifactService.filterArtifactsByType('json', artifacts);
        const dreihouseArtifacts = this.filterArtifacts(jsonArtifacts);

        const artifactsWithContent = dreihouseArtifacts.map(async (artifact: CircleArtifact) => {
            const content = await this.artifactService.getArtifactContent<CircleReportContent>(artifact.url, token);
            if (!content.key) {
                content.key = content.tag + ':' + content.url;
            }
            artifact.data = content;
            return artifact;
        });

        return await Promise.all(artifactsWithContent);
    }

    public async getBuildsArtifactData(builds: Build[], vcs: string, username: string, project: string, token: string): Promise<Build[]> {
        const buildsWithArtifacts = builds.map(async (build: Build) => {
            build.artifacts = await this.getArtifactsWithData(build.build_num, vcs, username, project, token);
            return build;
        });
        return await Promise.all(buildsWithArtifacts);
    }

    public async getChartData(vcs: string, username: string, project: string, buildNum: number, token: string) {
        const artifacts = await this.getArtifactsWithData(buildNum, vcs, username, project, token);
        const groupedBuildReports = groupResultsByReportTag(artifacts);
        return await buildChartDataFromTaggedResults(groupedBuildReports);
    }
}
