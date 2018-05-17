import RunReport from "@dreipol/dreiguard/bin/RunReport";
import {Capability, FlattedDreiguardData} from "../Interfaces/DreiguardReport";

export default class FlattedDreiguardDataFactory{
    static transform(report: RunReport): FlattedDreiguardData{
        const capability:Capability = {
            browserName: report.capability.browserName,
            browser_version: report.capability.browser_version,
            os: report.capability.os,
            os_version: report.capability.os_version,
            resolution: report.capability.resolution,
            project: report.capability.project,
            name: report.capability.name,
        };

        return {
            capability,
            screenshot: report.screenshot,
            diff: report.diff,
            whitepageDiff: report.whitepageDiff,
        }
    }
}
