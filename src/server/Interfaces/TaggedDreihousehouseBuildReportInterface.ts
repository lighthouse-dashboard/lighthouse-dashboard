export default interface TaggedDreihousehouseBuildReportInterface {
    [key: string] : DreihousehouseBuildReportInterface;
}


export interface DreihousehouseBuildReportInterface {
    [key: string]: DreihousehouseBuildCategoryInterface ;
}

export interface DreihousehouseBuildCategoryInterface{
    budget: string | number | boolean | undefined;
    score: number;
}
