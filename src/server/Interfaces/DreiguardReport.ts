import Diff from "@dreipol/dreiguard/bin/interfaces/Diff";

export interface Capability {
    browserName: string;
    browser_version: string;
    os: string;
    os_version: string;
    resolution: string;
    project: string;
    name: string;
}

export interface FlattedDreiguardData {
    capability: Capability;
    screenshot: string;
    diff: Diff | null;
    whitepageDiff: Diff | null;
}
