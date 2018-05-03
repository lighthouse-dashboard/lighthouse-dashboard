import {getArtifactsForBuildNum, getArtifactContent} from "../artifact";
import Build from "../../interfaces/Build";
import CircleArtifact from "../../interfaces/Artifact";
import {CircleReportContent} from "../../interfaces/CircleReportContent";
import {buildChartDataFromTaggedResults, groupResultsByReportTag} from "../build/helper";
import {filterDreihouseArtifacts} from "./helper";
import {filterArtifactsByType} from "../artifact/helper";

async function getDreihouseArtifactsWithData(buildNumber: number, vcs: string, username: string, project: string, token: string): Promise<CircleArtifact[]> {
    const artifacts = await getArtifactsForBuildNum(buildNumber, vcs, username, project, token);
    const jsonArtifacts = filterArtifactsByType('json', artifacts);
    const dreihouseArtifacts = filterDreihouseArtifacts(jsonArtifacts);

    const artifactsWithContent = dreihouseArtifacts.map(async (artifact: CircleArtifact) => {
        const content = await getArtifactContent<CircleReportContent>(artifact.url, token);
        if (!content.key) {
            content.key = content.tag + ':' + content.url;
        }
        artifact.data = content;
        return artifact;
    });

    return await Promise.all(artifactsWithContent);
}

export async function getBuildsDreihouseArtifactData(builds: Build[], vcs: string, username: string, project: string, token: string): Promise<Build[]> {
    const buildsWithArtifacts = builds.map(async (build: Build) => {
        build.artifacts = await getDreihouseArtifactsWithData(build.build_num, vcs, username, project, token);
        return build;
    });
    return await Promise.all(buildsWithArtifacts);
}


export async function getChartData(vcs: string, username: string, project: string, buildNum: number, token: string) {
    const artifacts = await getDreihouseArtifactsWithData(buildNum, vcs, username, project, token);
    const groupedBuildReports = groupResultsByReportTag(artifacts);
    return await buildChartDataFromTaggedResults(groupedBuildReports);
}
