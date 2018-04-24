export interface CircleProjectInterface {
    username: string;
    reponame: string;
    branches: any;
    vcs: string;
}

export interface CircleBuildInterface {
    stop_time: number;
    build_num: number;
}

export interface CircleArtifactInterface {
    url: string,
    path: string;
    data?: any;
}

export interface ProjectInterface {
    username: string;
    project: string;
    lastBuild: CircleBuildInterface;
    vcs: string;
}

export interface BuildInterface {
    build_num: number;
    artifacts: CircleArtifactInterface[];
    artifactContent?: CircleReportContentInterface[];
}

export interface CircleReportContentInterface {
    [key: string]: any;

    key: string;
    tag: string;
    url: string;
    categories: ReportCategoryInterface[];
}

export interface TaggedBuildDataInterface {
    [key: string]: TaggedBuildDataSeriesInterface;
}

export interface TaggedBuildDataSeriesInterface {
    series: ReportDataSeriesInterface;
    build: CategoriesScoreInterface;
    categories: number[];
    budget: BudgetInterface,
    trend: CategoriesScoreInterface
}

export interface TagGroupedArtifactDataInterface {
    [key: string]: CircleReportContentInterface[];
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

export interface ChartDataInterface {
    [key: string]: ChartDataEntryInterface;
}

export interface ChartDataEntryInterface {
    columns: TaggedChartColumns;
    categories: string[];
}

export interface TaggedChartColumns {
    [key: string]: any[];
}

export interface ApplicationState {
    token: string;
    limit: number;
}
