export interface CircleProjectInterface {
    username: string;
    reponame: string;
    branches: any;
    vcs_type: string;
}

export interface CircleBuildInterface {
    stop_time: number;
    build_num: number;
    subject: string;
    user: any;
    build_time_milis: number;
    status: string;
}

export interface CircleArtifactInterface {
    url: string,
    path: string;
    data?: any;
}

export interface CircleReportContentInterface {
    [key: string]: any;

    key: string;
    tag: string;
    url: string;
    categories: ReportCategoryInterface[];
}

export interface ProjectCacheInterface {
    [key: string]: ProjectInterface[];
}


export interface ProjectInterface {
    username: string;
    project: string;
    lastBuild: CircleBuildInterface;
    vcs: string;
}

export interface BuildInterface {
    build_num: number;
    subject: string,
    user: any;
    build_time_millis: number, 
    stop_time: any;
    status: string;
    artifacts: CircleArtifactInterface[];
    artifactContent?: CircleReportContentInterface[];
}


export interface ProjectSeriesData {
    [key: string]: ProjectArtifactTagData
}

export interface ProjectArtifactTagData {
    series: ReportDataSeriesInterface;
    build: CategoriesScoreInterface;
    categories: number[];
    budget: BudgetInterface,
    trend: CategoriesScoreInterface
}

export interface GroupedBuildReports {
    [key: string]: CircleReportContentInterface[]
}

export interface ReportDataSeriesInterface {
    [key: string]: number[];
}

export interface CategoriesScoreInterface {
    [key: string]: number;
}


export interface ReportCategoryInterface {
    score: number;
    name: string;
    id: string;
}

export interface BudgetInterface {
    [key: string]: number;
}

export interface BuildChartData {
    columns: BuildChartRowsData;
    categories: string[];
}

export interface BuildChartRowsData {
    [key: string]: Array<string | number>[];
}


export interface ApplicationState {
    token: string;
    limit: number;
}
