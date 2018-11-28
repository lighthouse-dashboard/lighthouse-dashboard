import {forEach} from 'lodash';
import CircleArtifact from '../Interfaces/Artifact';
import TaggedDreihousehouseBuildReportInterface, {DreihousehouseBuildReportInterface} from '../Interfaces/TaggedDreihousehouseBuildReportInterface';
import ReportCategory from '@dreipol/lighthouse-runner/dist/Interfaces/ReportCategory';
import ReportResult from '@dreipol/lighthouse-runner/dist/Interfaces/ReportResult';

export default class LighthouseDataCollector {

    public static getCategoryResult(reportResult: ReportResult): DreihousehouseBuildReportInterface {
        const results: DreihousehouseBuildReportInterface = {};

        forEach(reportResult.categories, (category: ReportCategory) => {
            results[category.id] = {
                score: category.score,
                budget: reportResult.budget[category.id],
            };
        });
        return results;
    }

    public static getTagResult(artifacts: CircleArtifact[]): TaggedDreihousehouseBuildReportInterface {
        const results: TaggedDreihousehouseBuildReportInterface = {};
        forEach(artifacts, (artifact: CircleArtifact) => {
            const data = <ReportResult> artifact.data;
            results[data.key] = this.getCategoryResult(data);
        });
        return results;
    }

    public static getBuildData(artifacts: CircleArtifact[]): TaggedDreihousehouseBuildReportInterface {
        return this.getTagResult(artifacts);
    }
}
