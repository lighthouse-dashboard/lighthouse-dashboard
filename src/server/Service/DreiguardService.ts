import {uniq} from 'lodash';

import {FlattedDreiguardData} from '../Interfaces/DreiguardReport';
import CircleArtifact from '../Interfaces/Artifact';
import ArtifactService from './ArtifactService';
import RunReport from '@dreipol/dreiguard/bin/RunReport';
import FlattedDreiguardDataFactory from '../Factory/FlattedDreiguardDataFactory';
import DreiguardImageReplaceService from './DreiguardImageReplaceService';

export default class DreiguardService {
    protected artifactService: ArtifactService;
    protected imageReplaceService: DreiguardImageReplaceService;

    constructor(artifactService: ArtifactService,
                imageReplaceService: DreiguardImageReplaceService) {
        this.artifactService = artifactService;
        this.imageReplaceService = imageReplaceService;
    }

    public async getDiffData(vcs: string, username: string, project: string, buildNumber: number, token: string): Promise<FlattedDreiguardData[][]> {
        const dreiguardData = await this.getReportData(buildNumber, vcs, username, project, token);
        return this.flattenData(dreiguardData);
    }

    public async getScreenshots(vcs: string, username: string, project: string, buildNumber: number, token: string): Promise<string[]> {
        const dreiguardData = await this.getReportData(buildNumber, vcs, username, project, token);
        const images: string[] = [];
        dreiguardData.forEach((reports: RunReport[]) => {
            reports.forEach((report: RunReport) => {
                images.push(...report.compareFiles);
            });
        });

        return uniq(images);
    }

    public async getDiffs(vcs: string, username: string, project: string, buildNumber: number, token: string): Promise<string[]> {
        const dreiguardData = await this.getReportData(buildNumber, vcs, username, project, token);

        const images: string[] = [];

        dreiguardData.forEach((reports: RunReport[]) => {
            reports.forEach((report: RunReport) => {
                if (report.diff && report.diff.diffFile) {
                    images.push(report.diff.diffFile);
                }
            });
        });

        return uniq(images);
    }

    private async loadForArtifacts(artifacts: CircleArtifact[], token: string) {
        const artifactsWithContent = artifacts.map(async (artifact: CircleArtifact) => {
            artifact.data = await this.artifactService.getArtifactContent<RunReport[]>(artifact.url, token);
            return artifact;
        });

        return await Promise.all(artifactsWithContent);
    }

    private flattenData(reports: RunReport[][]): FlattedDreiguardData[][] {
        return reports.map((report: RunReport[]) => {
            return report.map((entry: RunReport) => {
                return FlattedDreiguardDataFactory.transform(entry);
            });
        });
    }

    private filterArtifacts(artifacts: CircleArtifact[]): CircleArtifact[] {
        return artifacts.filter((artifact: CircleArtifact) => {
            return (artifact.path.startsWith('dreiguard'));
        });
    }

    private async getReportData(buildNumber: number, vcs: string, username: string, project: string, token: string): Promise<RunReport[][]> {
        const artifacts = await this.artifactService.getArtifactsForBuildNum(buildNumber, vcs, username, project, token);

        const dreiguardArtifacts = this.filterArtifacts(artifacts);
        const jsonArtifacts = this.artifactService.filterArtifactsByType('json', dreiguardArtifacts);
        const imageArtifacts = this.artifactService.filterArtifactsByType('png', dreiguardArtifacts);

        const jsonArtifactsWithData = await this.loadForArtifacts(jsonArtifacts, token);

        return jsonArtifactsWithData.map((artifact: CircleArtifact) => {
            return this.imageReplaceService.replaceImagePaths(<RunReport[]> artifact.data, imageArtifacts, token);
        });
    }
}