import {buildChartDataFromTaggedResults, groupResultsByReportTag} from "../utils/chart";
import {filterDreihouseArtifacts} from "../utils/dreihouse";
import CircleArtifact from "../interfaces/Artifact";
import {CircleReportContent} from "../interfaces/CircleReportContent";
import {filterArtifactsByType} from "../utils/artifacts";
import ArtifactService from "./ArtifactService";
import Build from "../interfaces/Build";

export default class DreihouseService {
    artifactService: ArtifactService;

    constructor(artifactService: ArtifactService) {
        this.artifactService = artifactService;
    }

    private async getDreihouseArtifactsWithData(buildNumber: number, vcs: string, username: string, project: string, token: string): Promise<CircleArtifact[]> {
        const artifacts = await this.artifactService.getArtifactsForBuildNum(buildNumber, vcs, username, project, token);
        const jsonArtifacts = filterArtifactsByType('json', artifacts);
        const dreihouseArtifacts = filterDreihouseArtifacts(jsonArtifacts);

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
            build.artifacts = await this.getDreihouseArtifactsWithData(build.build_num, vcs, username, project, token);
            return build;
        });
        return await Promise.all(buildsWithArtifacts);
    }

    public async getChartData(vcs: string, username: string, project: string, buildNum: number, token: string) {
        const artifacts = await this.getDreihouseArtifactsWithData(buildNum, vcs, username, project, token);
        const groupedBuildReports = groupResultsByReportTag(artifacts);
        return await buildChartDataFromTaggedResults(groupedBuildReports);
    }
}
