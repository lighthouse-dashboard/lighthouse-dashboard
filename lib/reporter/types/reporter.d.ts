export namespace Reporter {
    export type Reporter = {
        register: () => boolean | ReportFunction;
    };

    export type ReportFunction = (eventData: string, data?: any) => void;
}
