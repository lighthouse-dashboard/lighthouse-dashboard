export interface Test {
	browserName: string;
	browserVersion: string;
	os: string;
	osVersion: string;
	resolution: string;
}

export interface Browserstack {
	user: string;
	key: string;
	video: boolean;
}

export interface Config {
	tests: Test[];
	browserstack: Browserstack;
	project: string;
	name: string;
	waitForElementSelector: string;
	threshold: number;
	folder: string;
	cleanupImages: boolean;
}

export interface Capability {
	os: string;
	os_version: string;
	browserName: string;
	browser_version: string;
	resolution: string;
	'browserstack.user': string;
	'browserstack.key': string;
	'browserstack.video': boolean;
	project: string;
	name: string;
}

export interface Diff {
	total: number;
	percentage: number;
}

export default interface DreiguardReport {
	config: Config;
	capability: Capability;
	threshold: number;
	screenshot: string;
	diff: Diff;
	compareFiles: string[];
	diffReport: DreiguardReport;
}