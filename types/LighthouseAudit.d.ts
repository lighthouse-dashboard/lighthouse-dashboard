declare module namespace {

    export interface Environment {
        networkUserAgent: string;
        hostUserAgent: string;
        benchmarkIndex: number;
    }

    export interface Details {
        type: string;
        headings: any[];
        items: any[];
    }

    export interface IsOnHttps {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        displayValue: string;
        details: Details;
    }

    export interface RedirectsHttp {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
    }

    export interface ServiceWorker {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
    }

    export interface WorksOffline {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        warnings: any[];
    }

    export interface Viewport {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        warnings: any[];
    }

    export interface WithoutJavascript {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        explanation: string;
    }

    export interface FirstContentfulPaint {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        numericValue: number;
        displayValue: string;
    }

    export interface FirstMeaningfulPaint {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        numericValue: number;
        displayValue: string;
    }

    export interface LoadFastEnoughForPwa {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        numericValue: number;
    }

    export interface SpeedIndex {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        numericValue: number;
        displayValue: string;
    }

    export interface Item {
        timing: number;
        timestamp: any;
        data: string;
    }

    export interface Details2 {
        type: string;
        scale: number;
        items: Item[];
    }

    export interface ScreenshotThumbnails {
        id: string;
        title: string;
        description: string;
        score?: any;
        scoreDisplayMode: string;
        details: Details2;
    }

    export interface Details3 {
        type: string;
        timing: number;
        timestamp: number;
        data: string;
    }

    export interface FinalScreenshot {
        id: string;
        title: string;
        description: string;
        score?: any;
        scoreDisplayMode: string;
        details: Details3;
    }

    export interface EstimatedInputLatency {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        numericValue: number;
        displayValue: string;
    }

    export interface TotalBlockingTime {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        numericValue: number;
        displayValue: string;
    }

    export interface MaxPotentialFid {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        numericValue: number;
        displayValue: string;
    }

    export interface Details4 {
        type: string;
        headings: any[];
        items: any[];
    }

    export interface ErrorsInConsole {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        numericValue: number;
        details: Details4;
    }

    export interface Details5 {
        type: string;
        overallSavingsMs: number;
        headings: any[];
        items: any[];
    }

    export interface TimeToFirstByte {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        numericValue: number;
        displayValue: string;
        details: Details5;
    }

    export interface FirstCpuIdle {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        numericValue: number;
        displayValue: string;
    }

    export interface Interactive {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        numericValue: number;
        displayValue: string;
    }

    export interface Details6 {
        type: string;
        headings: any[];
        items: any[];
    }

    export interface UserTimings {
        id: string;
        title: string;
        description: string;
        score?: any;
        scoreDisplayMode: string;
        details: Details6;
    }

    export interface Request {
        url: string;
        startTime: number;
        endTime: number;
        responseReceivedTime: number;
        transferSize: number;
    }

    export interface Request2 {
        url: string;
        startTime: number;
        endTime: number;
        responseReceivedTime: number;
        transferSize: number;
    }

export interface
    304381;
    {
        request: Request2;
    }

    export interface Request3 {
        url: string;
        startTime: number;
        endTime: number;
        responseReceivedTime: number;
        transferSize: number;
    }

export interface
    304382;
    {
        request: Request3;
    }

    export interface Request4 {
        url: string;
        startTime: number;
        endTime: number;
        responseReceivedTime: number;
        transferSize: number;
    }

export interface
    304383;
    {
        request: Request4;
    }

    export interface Request5 {
        url: string;
        startTime: number;
        endTime: number;
        responseReceivedTime: number;
        transferSize: number;
    }

export interface
    304387;
    {
        request: Request5;
    }

    export interface Children {
        3043.81: 304381;
        3043.82: 304382;
        3043.83: 304383;
        3043.87: 304387;
    }

    export interface A79C2DBA7E1C0B01541D0F39DF43368E {
        request: Request;
        children: Children;
    }

    export interface Request6 {
        url: string;
        startTime: number;
        endTime: number;
        responseReceivedTime: number;
        transferSize: number;
    }

export interface
    3043119;
    {
        request: Request6;
    }

    export interface Request7 {
        url: string;
        startTime: number;
        endTime: number;
        responseReceivedTime: number;
        transferSize: number;
    }

    export interface Request8 {
        url: string;
        startTime: number;
        endTime: number;
        responseReceivedTime: number;
        transferSize: number;
    }

    export interface Request9 {
        url: string;
        startTime: number;
        endTime: number;
        responseReceivedTime: number;
        transferSize: number;
    }

export interface
    3043122;
    {
        request: Request9;
    }

    export interface Request10 {
        url: string;
        startTime: number;
        endTime: number;
        responseReceivedTime: number;
        transferSize: number;
    }

export interface
    3043123;
    {
        request: Request10;
    }

    export interface Request11 {
        url: string;
        startTime: number;
        endTime: number;
        responseReceivedTime: number;
        transferSize: number;
    }

export interface
    3043124;
    {
        request: Request11;
    }

    export interface Request12 {
        url: string;
        startTime: number;
        endTime: number;
        responseReceivedTime: number;
        transferSize: number;
    }

export interface
    3043125;
    {
        request: Request12;
    }

    export interface Request13 {
        url: string;
        startTime: number;
        endTime: number;
        responseReceivedTime: number;
        transferSize: number;
    }

export interface
    3043126;
    {
        request: Request13;
    }

    export interface Children3 {
        3043.122: 3043122;
        3043.123: 3043123;
        3043.124: 3043124;
        3043.125: 3043125;
        3043.126: 3043126;
    }

export interface
    3043121;
    {
        request: Request8;
        children: Children3;
    }

    export interface Children2 {
        3043.121: 3043121;
    }

export interface
    3043120;
    {
        request: Request7;
        children: Children2;
    }

    export interface Chains {
        A79C2DBA7E1C0B01541D0F39DF43368E: A79C2DBA7E1C0B01541D0F39DF43368E;
        3043.119: 3043119;
        3043.120: 3043120;
    }

    export interface LongestChain {
        duration: number;
        length: number;
        transferSize: number;
    }

    export interface Details7 {
        type: string;
        chains: Chains;
        longestChain: LongestChain;
    }

    export interface CriticalRequestChains {
        id: string;
        title: string;
        description: string;
        score?: any;
        scoreDisplayMode: string;
        displayValue: string;
        details: Details7;
    }

    export interface Details8 {
        type: string;
        headings: any[];
        items: any[];
        overallSavingsMs: number;
    }

    export interface Redirects {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        numericValue: number;
        displayValue: string;
        details: Details8;
    }

    export interface Item2 {
        failures: string[];
        isParseFailure: boolean;
        hasStartUrl: boolean;
        hasIconsAtLeast192px: boolean;
        hasIconsAtLeast512px: boolean;
        hasPWADisplayValue: boolean;
        hasBackgroundColor: boolean;
        hasThemeColor: boolean;
        hasShortName: boolean;
        shortNameLength: boolean;
        hasName: boolean;
    }

    export interface Details9 {
        type: string;
        items: Item2[];
    }

    export interface InstallableManifest {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        explanation: string;
        details: Details9;
    }

    export interface AppleTouchIcon {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        warnings: any[];
    }

    export interface Item3 {
        failures: string[];
        isParseFailure: boolean;
        hasStartUrl: boolean;
        hasIconsAtLeast192px: boolean;
        hasIconsAtLeast512px: boolean;
        hasPWADisplayValue: boolean;
        hasBackgroundColor: boolean;
        hasThemeColor: boolean;
        hasShortName: boolean;
        shortNameLength: boolean;
        hasName: boolean;
    }

    export interface Details10 {
        type: string;
        items: Item3[];
    }

    export interface SplashScreen {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        explanation: string;
        details: Details10;
    }

    export interface Item4 {
        failures: string[];
        themeColor: string;
        isParseFailure: boolean;
        hasStartUrl: boolean;
        hasIconsAtLeast192px: boolean;
        hasIconsAtLeast512px: boolean;
        hasPWADisplayValue: boolean;
        hasBackgroundColor: boolean;
        hasThemeColor: boolean;
        hasShortName: boolean;
        shortNameLength: boolean;
        hasName: boolean;
    }

    export interface Details11 {
        type: string;
        items: Item4[];
    }

    export interface ThemedOmnibox {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        explanation: string;
        details: Details11;
    }

    export interface ContentWidth {
        id: string;
        title: string;
        description: string;
        score?: any;
        scoreDisplayMode: string;
    }

    export interface Details12 {
        type: string;
        headings: any[];
        items: any[];
    }

    export interface ImageAspectRatio {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        warnings: any[];
        details: Details12;
    }

    export interface Details13 {
        type: string;
        headings: any[];
        items: any[];
    }

    export interface Deprecations {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        displayValue: string;
        details: Details13;
    }

    export interface Heading {
        key: string;
        itemType: string;
        text: string;
        granularity?: number;
    }

    export interface Item5 {
        group: string;
        groupLabel: string;
        duration: number;
    }

    export interface Details14 {
        type: string;
        headings: Heading[];
        items: Item5[];
    }

    export interface MainthreadWorkBreakdown {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        numericValue: number;
        displayValue: string;
        details: Details14;
    }

    export interface Heading2 {
        key: string;
        itemType: string;
        text: string;
        granularity?: number;
    }

    export interface Item6 {
        url: string;
        total: number;
        scripting: number;
        scriptParseCompile: number;
    }

    export interface Summary {
        wastedMs: number;
    }

    export interface Details15 {
        type: string;
        headings: Heading2[];
        items: Item6[];
        summary: Summary;
    }

    export interface BootupTime {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        numericValue: number;
        displayValue: string;
        details: Details15;
    }

    export interface Details16 {
        type: string;
        headings: any[];
        items: any[];
        overallSavingsMs: number;
    }

    export interface UsesRelPreload {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        numericValue: number;
        displayValue: string;
        details: Details16;
    }

    export interface Details17 {
        type: string;
        headings: any[];
        items: any[];
        overallSavingsMs: number;
    }

    export interface UsesRelPreconnect {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        numericValue: number;
        displayValue: string;
        warnings: any[];
        details: Details17;
    }

    export interface Details18 {
        type: string;
        headings: any[];
        items: any[];
    }

    export interface FontDisplay {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        warnings: any[];
        details: Details18;
    }

    export interface Item7 {
        numRequests: number;
        numScripts: number;
        numStylesheets: number;
        numFonts: number;
        numTasks: number;
        numTasksOver10ms: number;
        numTasksOver25ms: number;
        numTasksOver50ms: number;
        numTasksOver100ms: number;
        numTasksOver500ms: number;
        rtt: number;
        throughput: number;
        maxRtt: number;
        maxServerLatency: number;
        totalByteWeight: number;
        totalTaskTime: number;
        mainDocumentTransferSize: number;
    }

    export interface Details19 {
        type: string;
        items: Item7[];
    }

    export interface Diagnostics {
        id: string;
        title: string;
        description: string;
        score?: any;
        scoreDisplayMode: string;
        details: Details19;
    }

    export interface Heading3 {
        key: string;
        itemType: string;
        text: string;
        granularity?: number;
        displayUnit: string;
    }

    export interface Item8 {
        url: string;
        startTime: number;
        endTime: number;
        transferSize: number;
        resourceSize: number;
        statusCode: number;
        mimeType: string;
        resourceType: string;
    }

    export interface Details20 {
        type: string;
        headings: Heading3[];
        items: Item8[];
    }

    export interface NetworkRequests {
        id: string;
        title: string;
        description: string;
        score?: any;
        scoreDisplayMode: string;
        numericValue: number;
        details: Details20;
    }

    export interface Heading4 {
        key: string;
        itemType: string;
        text: string;
        granularity?: number;
    }

    export interface Item9 {
        origin: string;
        rtt: number;
    }

    export interface Details21 {
        type: string;
        headings: Heading4[];
        items: Item9[];
    }

    export interface NetworkRtt {
        id: string;
        title: string;
        description: string;
        score?: any;
        scoreDisplayMode: string;
        numericValue: number;
        displayValue: string;
        details: Details21;
    }

    export interface Heading5 {
        key: string;
        itemType: string;
        text: string;
        granularity?: number;
    }

    export interface Item10 {
        origin: string;
        serverResponseTime: number;
    }

    export interface Details22 {
        type: string;
        headings: Heading5[];
        items: Item10[];
    }

    export interface NetworkServerLatency {
        id: string;
        title: string;
        description: string;
        score?: any;
        scoreDisplayMode: string;
        numericValue: number;
        displayValue: string;
        details: Details22;
    }

    export interface Heading6 {
        key: string;
        itemType: string;
        granularity: number;
        text: string;
    }

    export interface Item11 {
        duration: number;
        startTime: number;
    }

    export interface Details23 {
        type: string;
        headings: Heading6[];
        items: Item11[];
    }

    export interface MainThreadTasks {
        id: string;
        title: string;
        description: string;
        score?: any;
        scoreDisplayMode: string;
        numericValue: number;
        details: Details23;
    }

    export interface Item12 {
        firstContentfulPaint: number;
        firstContentfulPaintTs: number;
        firstMeaningfulPaint: number;
        firstMeaningfulPaintTs: number;
        largestContentfulPaint: number;
        largestContentfulPaintTs: number;
        firstCPUIdle: number;
        firstCPUIdleTs: number;
        interactive: number;
        interactiveTs: number;
        speedIndex: number;
        speedIndexTs: number;
        estimatedInputLatency: number;
        totalBlockingTime: number;
        observedNavigationStart: number;
        observedNavigationStartTs: number;
        observedFirstPaint: number;
        observedFirstPaintTs: number;
        observedFirstContentfulPaint: number;
        observedFirstContentfulPaintTs: number;
        observedFirstMeaningfulPaint: number;
        observedFirstMeaningfulPaintTs: number;
        observedLargestContentfulPaint: number;
        observedLargestContentfulPaintTs: number;
        observedTraceEnd: number;
        observedTraceEndTs: number;
        observedLoad: number;
        observedLoadTs: number;
        observedDomContentLoaded: number;
        observedDomContentLoadedTs: number;
        observedFirstVisualChange: number;
        observedFirstVisualChangeTs: number;
        observedLastVisualChange: number;
        observedLastVisualChangeTs: number;
        observedSpeedIndex: number;
        observedSpeedIndexTs: number;
        lcpInvalidated?: boolean;
    }

    export interface Details24 {
        type: string;
        items: Item12[];
    }

    export interface Metrics {
        id: string;
        title: string;
        description: string;
        score?: any;
        scoreDisplayMode: string;
        numericValue: number;
        details: Details24;
    }

    export interface OfflineStartUrl {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        explanation: string;
        warnings: any[];
    }

    export interface PerformanceBudget {
        id: string;
        title: string;
        description: string;
        score?: any;
        scoreDisplayMode: string;
    }

    export interface Heading7 {
        key: string;
        itemType: string;
        text: string;
    }

    export interface Item13 {
        resourceType: string;
        label: string;
        requestCount: number;
        size: number;
    }

    export interface Details25 {
        type: string;
        headings: Heading7[];
        items: Item13[];
    }

    export interface ResourceSummary {
        id: string;
        title: string;
        description: string;
        score?: any;
        scoreDisplayMode: string;
        displayValue: string;
        details: Details25;
    }

    export interface Heading8 {
        key: string;
        itemType: string;
        text: string;
        granularity?: number;
    }

    export interface Entity {
        type: string;
        text: string;
        url: string;
    }

    export interface Item14 {
        entity: Entity;
        transferSize: number;
        mainThreadTime: number;
        blockingTime: number;
    }

    export interface Summary2 {
        wastedBytes: number;
        wastedMs: number;
    }

    export interface Details26 {
        type: string;
        headings: Heading8[];
        items: Item14[];
        summary: Summary2;
    }

    export interface ThirdPartySummary {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        displayValue: string;
        details: Details26;
    }

    export interface PwaCrossBrowser {
        id: string;
        title: string;
        description: string;
        score?: any;
        scoreDisplayMode: string;
    }

    export interface PwaPageTransitions {
        id: string;
        title: string;
        description: string;
        score?: any;
        scoreDisplayMode: string;
    }

    export interface PwaEachPageHasUrl {
        id: string;
        title: string;
        description: string;
        score?: any;
        scoreDisplayMode: string;
    }

    export interface Accesskeys {
        id: string;
        title: string;
        description: string;
        score?: any;
        scoreDisplayMode: string;
    }

    export interface AriaAllowedAttr {
        id: string;
        title: string;
        description: string;
        score?: any;
        scoreDisplayMode: string;
    }

    export interface AriaRequiredAttr {
        id: string;
        title: string;
        description: string;
        score?: any;
        scoreDisplayMode: string;
    }

    export interface AriaRequiredChildren {
        id: string;
        title: string;
        description: string;
        score?: any;
        scoreDisplayMode: string;
    }

    export interface AriaRequiredParent {
        id: string;
        title: string;
        description: string;
        score?: any;
        scoreDisplayMode: string;
    }

    export interface AriaRoles {
        id: string;
        title: string;
        description: string;
        score?: any;
        scoreDisplayMode: string;
    }

    export interface AriaValidAttrValue {
        id: string;
        title: string;
        description: string;
        score?: any;
        scoreDisplayMode: string;
    }

    export interface AriaValidAttr {
        id: string;
        title: string;
        description: string;
        score?: any;
        scoreDisplayMode: string;
    }

    export interface AudioCaption {
        id: string;
        title: string;
        description: string;
        score?: any;
        scoreDisplayMode: string;
    }

    export interface ButtonName {
        id: string;
        title: string;
        description: string;
        score?: any;
        scoreDisplayMode: string;
    }

    export interface Details27 {
        type: string;
        headings: any[];
        items: any[];
    }

    export interface Bypass {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        details: Details27;
    }

    export interface Details28 {
        type: string;
        headings: any[];
        items: any[];
    }

    export interface ColorContrast {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        details: Details28;
    }

    export interface DefinitionList {
        id: string;
        title: string;
        description: string;
        score?: any;
        scoreDisplayMode: string;
    }

    export interface Dlitem {
        id: string;
        title: string;
        description: string;
        score?: any;
        scoreDisplayMode: string;
    }

    export interface Details29 {
        type: string;
        headings: any[];
        items: any[];
    }

    export interface DocumentTitle {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        details: Details29;
    }

    export interface Details30 {
        type: string;
        headings: any[];
        items: any[];
    }

    export interface DuplicateId {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        details: Details30;
    }

    export interface FrameTitle {
        id: string;
        title: string;
        description: string;
        score?: any;
        scoreDisplayMode: string;
    }

    export interface Details31 {
        type: string;
        headings: any[];
        items: any[];
    }

    export interface HtmlHasLang {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        details: Details31;
    }

    export interface Details32 {
        type: string;
        headings: any[];
        items: any[];
    }

    export interface HtmlLangValid {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        details: Details32;
    }

    export interface Heading9 {
        key: string;
        itemType: string;
        text: string;
    }

    export interface Node {
        type: string;
        selector: string;
        path: string;
        snippet: string;
        explanation: string;
        nodeLabel: string;
    }

    export interface Item15 {
        node: Node;
    }

    export interface DebugData {
        type: string;
        impact: string;
        tags: string[];
    }

    export interface Details33 {
        type: string;
        headings: Heading9[];
        items: Item15[];
        debugData: DebugData;
    }

    export interface ImageAlt {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        details: Details33;
    }

    export interface InputImageAlt {
        id: string;
        title: string;
        description: string;
        score?: any;
        scoreDisplayMode: string;
    }

    export interface Label {
        id: string;
        title: string;
        description: string;
        score?: any;
        scoreDisplayMode: string;
    }

    export interface LayoutTable {
        id: string;
        title: string;
        description: string;
        score?: any;
        scoreDisplayMode: string;
    }

    export interface Details34 {
        type: string;
        headings: any[];
        items: any[];
    }

    export interface LinkName {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        details: Details34;
    }

    export interface Details35 {
        type: string;
        headings: any[];
        items: any[];
    }

    export interface List {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        details: Details35;
    }

    export interface Details36 {
        type: string;
        headings: any[];
        items: any[];
    }

    export interface Listitem {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        details: Details36;
    }

    export interface MetaRefresh {
        id: string;
        title: string;
        description: string;
        score?: any;
        scoreDisplayMode: string;
    }

    export interface Details37 {
        type: string;
        headings: any[];
        items: any[];
    }

    export interface MetaViewport {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        details: Details37;
    }

    export interface ObjectAlt {
        id: string;
        title: string;
        description: string;
        score?: any;
        scoreDisplayMode: string;
    }

    export interface Tabindex {
        id: string;
        title: string;
        description: string;
        score?: any;
        scoreDisplayMode: string;
    }

    export interface TdHeadersAttr {
        id: string;
        title: string;
        description: string;
        score?: any;
        scoreDisplayMode: string;
    }

    export interface ThHasDataCells {
        id: string;
        title: string;
        description: string;
        score?: any;
        scoreDisplayMode: string;
    }

    export interface ValidLang {
        id: string;
        title: string;
        description: string;
        score?: any;
        scoreDisplayMode: string;
    }

    export interface VideoCaption {
        id: string;
        title: string;
        description: string;
        score?: any;
        scoreDisplayMode: string;
    }

    export interface VideoDescription {
        id: string;
        title: string;
        description: string;
        score?: any;
        scoreDisplayMode: string;
    }

    export interface CustomControlsLabels {
        id: string;
        title: string;
        description: string;
        score?: any;
        scoreDisplayMode: string;
    }

    export interface CustomControlsRoles {
        id: string;
        title: string;
        description: string;
        score?: any;
        scoreDisplayMode: string;
    }

    export interface FocusTraps {
        id: string;
        title: string;
        description: string;
        score?: any;
        scoreDisplayMode: string;
    }

    export interface FocusableControls {
        id: string;
        title: string;
        description: string;
        score?: any;
        scoreDisplayMode: string;
    }

    export interface HeadingLevels {
        id: string;
        title: string;
        description: string;
        score?: any;
        scoreDisplayMode: string;
    }

    export interface InteractiveElementAffordance {
        id: string;
        title: string;
        description: string;
        score?: any;
        scoreDisplayMode: string;
    }

    export interface LogicalTabOrder {
        id: string;
        title: string;
        description: string;
        score?: any;
        scoreDisplayMode: string;
    }

    export interface ManagedFocus {
        id: string;
        title: string;
        description: string;
        score?: any;
        scoreDisplayMode: string;
    }

    export interface OffscreenContentHidden {
        id: string;
        title: string;
        description: string;
        score?: any;
        scoreDisplayMode: string;
    }

    export interface UseLandmarks {
        id: string;
        title: string;
        description: string;
        score?: any;
        scoreDisplayMode: string;
    }

    export interface VisualOrderFollowsDom {
        id: string;
        title: string;
        description: string;
        score?: any;
        scoreDisplayMode: string;
    }

    export interface Heading10 {
        key: string;
        itemType: string;
        text: string;
        displayUnit: string;
        granularity?: number;
    }

    export interface DebugData2 {
        type: string;
        public: boolean;
        max
        -
        age: number;
        no
        -
        transform?: boolean;
        immutable?: boolean;
    }

    export interface Item16 {
        url: string;
        debugData: DebugData2;
        cacheLifetimeMs: any;
        cacheHitProbability: number;
        totalBytes: number;
        wastedBytes: number;
    }

    export interface Summary3 {
        wastedBytes: number;
    }

    export interface Details38 {
        type: string;
        headings: Heading10[];
        items: Item16[];
        summary: Summary3;
    }

    export interface UsesLongCacheTtl {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        numericValue: number;
        displayValue: string;
        details: Details38;
    }

    export interface Heading11 {
        key: string;
        itemType: string;
        text: string;
    }

    export interface Item17 {
        url: string;
        totalBytes: number;
    }

    export interface Details39 {
        type: string;
        headings: Heading11[];
        items: Item17[];
    }

    export interface TotalByteWeight {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        numericValue: number;
        displayValue: string;
        details: Details39;
    }

    export interface Details40 {
        type: string;
        headings: any[];
        items: any[];
        overallSavingsMs: number;
        overallSavingsBytes: number;
    }

    export interface OffscreenImages {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        numericValue: number;
        displayValue: string;
        warnings: any[];
        details: Details40;
    }

    export interface Heading12 {
        key: string;
        valueType: string;
        label: string;
    }

    export interface Item18 {
        url: string;
        totalBytes: number;
        wastedMs: number;
    }

    export interface Details41 {
        type: string;
        headings: Heading12[];
        items: Item18[];
        overallSavingsMs: number;
    }

    export interface RenderBlockingResources {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        numericValue: number;
        displayValue: string;
        details: Details41;
    }

    export interface Details42 {
        type: string;
        headings: any[];
        items: any[];
        overallSavingsMs: number;
        overallSavingsBytes: number;
    }

    export interface UnminifiedCss {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        numericValue: number;
        displayValue: string;
        details: Details42;
    }

    export interface Details43 {
        type: string;
        headings: any[];
        items: any[];
        overallSavingsMs: number;
        overallSavingsBytes: number;
    }

    export interface UnminifiedJavascript {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        numericValue: number;
        displayValue: string;
        warnings: any[];
        details: Details43;
    }

    export interface Details44 {
        type: string;
        headings: any[];
        items: any[];
        overallSavingsMs: number;
        overallSavingsBytes: number;
    }

    export interface UnusedCssRules {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        numericValue: number;
        displayValue: string;
        details: Details44;
    }

    export interface Heading13 {
        key: string;
        valueType: string;
        label: string;
    }

    export interface Item19 {
        url: string;
        fromProtocol: boolean;
        isCrossOrigin: boolean;
        totalBytes: number;
        wastedBytes: number;
    }

    export interface Details45 {
        type: string;
        headings: Heading13[];
        items: Item19[];
        overallSavingsMs: number;
        overallSavingsBytes: number;
    }

    export interface UsesWebpImages {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        numericValue: number;
        displayValue: string;
        warnings: any[];
        details: Details45;
    }

    export interface Heading14 {
        key: string;
        valueType: string;
        label: string;
    }

    export interface Item20 {
        url: string;
        fromProtocol: boolean;
        isCrossOrigin: boolean;
        totalBytes: number;
        wastedBytes: number;
    }

    export interface Details46 {
        type: string;
        headings: Heading14[];
        items: Item20[];
        overallSavingsMs: number;
        overallSavingsBytes: number;
    }

    export interface UsesOptimizedImages {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        numericValue: number;
        displayValue: string;
        warnings: any[];
        details: Details46;
    }

    export interface Details47 {
        type: string;
        headings: any[];
        items: any[];
        overallSavingsMs: number;
        overallSavingsBytes: number;
    }

    export interface UsesTextCompression {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        numericValue: number;
        displayValue: string;
        details: Details47;
    }

    export interface Details48 {
        type: string;
        headings: any[];
        items: any[];
        overallSavingsMs: number;
        overallSavingsBytes: number;
    }

    export interface UsesResponsiveImages {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        numericValue: number;
        displayValue: string;
        warnings: any[];
        details: Details48;
    }

    export interface Details49 {
        type: string;
        headings: any[];
        items: any[];
        overallSavingsMs: number;
        overallSavingsBytes: number;
    }

    export interface EfficientAnimatedContent {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        numericValue: number;
        displayValue: string;
        details: Details49;
    }

    export interface AppcacheManifest {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
    }

    export interface Doctype {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
    }

    export interface Heading15 {
        key: string;
        itemType: string;
        text: string;
    }

    export interface Item21 {
        statistic: string;
        element: any;
        value: string;
    }

    export interface Details50 {
        type: string;
        headings: Heading15[];
        items: Item21[];
    }

    export interface DomSize {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        numericValue: number;
        displayValue: string;
        details: Details50;
    }

    export interface Details51 {
        type: string;
        headings: any[];
        items: any[];
    }

    export interface ExternalAnchorsUseRelNoopener {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        warnings: any[];
        details: Details51;
    }

    export interface Details52 {
        type: string;
        headings: any[];
        items: any[];
    }

    export interface GeolocationOnStart {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        details: Details52;
    }

    export interface Details53 {
        type: string;
        headings: any[];
        items: any[];
    }

    export interface NoDocumentWrite {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        details: Details53;
    }

    export interface Summary4 {
    }

    export interface Details54 {
        type: string;
        headings: any[];
        items: any[];
        summary: Summary4;
    }

    export interface NoVulnerableLibraries {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        displayValue: string;
        details: Details54;
    }

    export interface Heading16 {
        key: string;
        itemType: string;
        text: string;
    }

    export interface Item22 {
        name: string;
        npm: string;
    }

    export interface Summary5 {
    }

    export interface Details55 {
        type: string;
        headings: Heading16[];
        items: Item22[];
        summary: Summary5;
    }

    export interface JsLibraries {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        details: Details55;
    }

    export interface Details56 {
        type: string;
        headings: any[];
        items: any[];
    }

    export interface NotificationOnStart {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        details: Details56;
    }

    export interface Details57 {
        type: string;
        headings: any[];
        items: any[];
    }

    export interface PasswordInputsCanBePastedInto {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        details: Details57;
    }

    export interface Heading17 {
        key: string;
        itemType: string;
        text: string;
    }

    export interface Item23 {
        protocol: string;
        url: string;
    }

    export interface Details58 {
        type: string;
        headings: Heading17[];
        items: Item23[];
    }

    export interface UsesHttp2 {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        displayValue: string;
        details: Details58;
    }

    export interface Details59 {
        type: string;
        headings: any[];
        items: any[];
    }

    export interface UsesPassiveEventListeners {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        details: Details59;
    }

    export interface MetaDescription {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
    }

    export interface HttpStatusCode {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
    }

    export interface FontSize {
        id: string;
        title: string;
        description: string;
        score?: any;
        scoreDisplayMode: string;
    }

    export interface Summary6 {
    }

    export interface Details60 {
        type: string;
        headings: any[];
        items: any[];
        summary: Summary6;
    }

    export interface LinkText {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        details: Details60;
    }

    export interface Details61 {
        type: string;
        headings: any[];
        items: any[];
    }

    export interface IsCrawlable {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        details: Details61;
    }

    export interface RobotsTxt {
        id: string;
        title: string;
        description: string;
        score?: any;
        scoreDisplayMode: string;
    }

    export interface TapTargets {
        id: string;
        title: string;
        description: string;
        score?: any;
        scoreDisplayMode: string;
    }

    export interface Details62 {
        type: string;
        headings: any[];
        items: any[];
    }

    export interface Hreflang {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        details: Details62;
    }

    export interface Details63 {
        type: string;
        headings: any[];
        items: any[];
    }

    export interface Plugins {
        id: string;
        title: string;
        description: string;
        score: number;
        scoreDisplayMode: string;
        details: Details63;
    }

    export interface Canonical {
        id: string;
        title: string;
        description: string;
        score?: any;
        scoreDisplayMode: string;
    }

    export interface StructuredData {
        id: string;
        title: string;
        description: string;
        score?: any;
        scoreDisplayMode: string;
    }

    export interface Audits {
        is
        -
        on
        -
        https: IsOnHttps;
        redirects
        -
        http: RedirectsHttp;
        service
        -
        worker: ServiceWorker;
        works
        -
        offline: WorksOffline;
        viewport: Viewport;
        without
        -
        javascript: WithoutJavascript;
        first
        -
        contentful
        -
        paint: FirstContentfulPaint;
        first
        -
        meaningful
        -
        paint: FirstMeaningfulPaint;
        load
        -
        fast
        -
        enough
        -
        for
        -
        pwa: LoadFastEnoughForPwa;
        speed
        -
        index: SpeedIndex;
        screenshot
        -
        thumbnails: ScreenshotThumbnails;
        final
        -
        screenshot: FinalScreenshot;
        estimated
        -
        input
        -
        latency: EstimatedInputLatency;
        total
        -
        blocking
        -
        time: TotalBlockingTime;
        max
        -
        potential
        -
        fid: MaxPotentialFid;
        errors
        -
        in
        -
        console: ErrorsInConsole;
        time
        -
        to
        -
        first
        -
        byte: TimeToFirstByte;
        first
        -
        cpu
        -
        idle: FirstCpuIdle;
        interactive: Interactive;
        user
        -
        timings: UserTimings;
        critical
        -
        request
        -
        chains: CriticalRequestChains;
        redirects: Redirects;
        installable
        -
        manifest: InstallableManifest;
        apple
        -
        touch
        -
        icon: AppleTouchIcon;
        splash
        -
        screen: SplashScreen;
        themed
        -
        omnibox: ThemedOmnibox;
        content
        -
        width: ContentWidth;
        image
        -
        aspect
        -
        ratio: ImageAspectRatio;
        deprecations: Deprecations;
        mainthread
        -
        work
        -
        breakdown: MainthreadWorkBreakdown;
        bootup
        -
        time: BootupTime;
        uses
        -
        rel
        -
        preload: UsesRelPreload;
        uses
        -
        rel
        -
        preconnect: UsesRelPreconnect;
        font
        -
        display: FontDisplay;
        diagnostics: Diagnostics;
        network
        -
        requests: NetworkRequests;
        network
        -
        rtt: NetworkRtt;
        network
        -
        server
        -
        latency: NetworkServerLatency;
        main
        -
        thread
        -
        tasks: MainThreadTasks;
        metrics: Metrics;
        offline
        -
        start
        -
        url: OfflineStartUrl;
        performance
        -
        budget: PerformanceBudget;
        resource
        -
        summary: ResourceSummary;
        third
        -
        party
        -
        summary: ThirdPartySummary;
        pwa
        -
        cross
        -
        browser: PwaCrossBrowser;
        pwa
        -
        page
        -
        transitions: PwaPageTransitions;
        pwa
        -
        each
        -
        page
        -
        has
        -
        url: PwaEachPageHasUrl;
        accesskeys: Accesskeys;
        aria
        -
        allowed
        -
        attr: AriaAllowedAttr;
        aria
        -
        required
        -
        attr: AriaRequiredAttr;
        aria
        -
        required
        -
        children: AriaRequiredChildren;
        aria
        -
        required
        -
        parent: AriaRequiredParent;
        aria
        -
        roles: AriaRoles;
        aria
        -
        valid
        -
        attr
        -
        value: AriaValidAttrValue;
        aria
        -
        valid
        -
        attr: AriaValidAttr;
        audio
        -
        caption: AudioCaption;
        button
        -
        name: ButtonName;
        bypass: Bypass;
        color
        -
        contrast: ColorContrast;
        definition
        -
        list: DefinitionList;
        dlitem: Dlitem;
        document
        -
        title: DocumentTitle;
        duplicate
        -
        id: DuplicateId;
        frame
        -
        title: FrameTitle;
        html
        -
        has
        -
        lang: HtmlHasLang;
        html
        -
        lang
        -
        valid: HtmlLangValid;
        image
        -
        alt: ImageAlt;
        input
        -
        image
        -
        alt: InputImageAlt;
        label: Label;
        layout
        -
        table: LayoutTable;
        link
        -
        name: LinkName;
        list: List;
        listitem: Listitem;
        meta
        -
        refresh: MetaRefresh;
        meta
        -
        viewport: MetaViewport;
        object
        -
        alt: ObjectAlt;
        tabindex: Tabindex;
        td
        -
        headers
        -
        attr: TdHeadersAttr;
        th
        -
        has
        -
        data
        -
        cells: ThHasDataCells;
        valid
        -
        lang: ValidLang;
        video
        -
        caption: VideoCaption;
        video
        -
        description: VideoDescription;
        custom
        -
        controls
        -
        labels: CustomControlsLabels;
        custom
        -
        controls
        -
        roles: CustomControlsRoles;
        focus
        -
        traps: FocusTraps;
        focusable
        -
        controls: FocusableControls;
        heading
        -
        levels: HeadingLevels;
        interactive
        -
        element
        -
        affordance: InteractiveElementAffordance;
        logical
        -
        tab
        -
        order: LogicalTabOrder;
        managed
        -
        focus: ManagedFocus;
        offscreen
        -
        content
        -
        hidden: OffscreenContentHidden;
        use
        -
        landmarks: UseLandmarks;
        visual
        -
        order
        -
        follows
        -
        dom: VisualOrderFollowsDom;
        uses
        -
        long
        -
        cache
        -
        ttl: UsesLongCacheTtl;
        total
        -
        byte
        -
        weight: TotalByteWeight;
        offscreen
        -
        images: OffscreenImages;
        render
        -
        blocking
        -
        resources: RenderBlockingResources;
        unminified
        -
        css: UnminifiedCss;
        unminified
        -
        javascript: UnminifiedJavascript;
        unused
        -
        css
        -
        rules: UnusedCssRules;
        uses
        -
        webp
        -
        images: UsesWebpImages;
        uses
        -
        optimized
        -
        images: UsesOptimizedImages;
        uses
        -
        text
        -
        compression: UsesTextCompression;
        uses
        -
        responsive
        -
        images: UsesResponsiveImages;
        efficient
        -
        animated
        -
        content: EfficientAnimatedContent;
        appcache
        -
        manifest: AppcacheManifest;
        doctype: Doctype;
        dom
        -
        size: DomSize;
        external
        -
        anchors
        -
        use
        -
        rel
        -
        noopener: ExternalAnchorsUseRelNoopener;
        geolocation
        -
        on
        -
        start: GeolocationOnStart;
        no
        -
        document
        -
        write: NoDocumentWrite;
        no
        -
        vulnerable
        -
        libraries: NoVulnerableLibraries;
        js
        -
        libraries: JsLibraries;
        notification
        -
        on
        -
        start: NotificationOnStart;
        password
        -
        inputs
        -
        can
        -
        be
        -
        pasted
        -
        into: PasswordInputsCanBePastedInto;
        uses
        -
        http2: UsesHttp2;
        uses
        -
        passive
        -
        event
        -
        listeners: UsesPassiveEventListeners;
        meta
        -
        description: MetaDescription;
        http
        -
        status
        -
        code: HttpStatusCode;
        font
        -
        size: FontSize;
        link
        -
        text: LinkText;
        is
        -
        crawlable: IsCrawlable;
        robots
        -
        txt: RobotsTxt;
        tap
        -
        targets: TapTargets;
        hreflang: Hreflang;
        plugins: Plugins;
        canonical: Canonical;
        structured
        -
        data: StructuredData;
    }

    export interface Throttling {
        rttMs: number;
        throughputKbps: number;
        requestLatencyMs: number;
        downloadThroughputKbps: number;
        uploadThroughputKbps: number;
        cpuSlowdownMultiplier: number;
    }

    export interface ConfigSettings {
        output: string;
        maxWaitForFcp: number;
        maxWaitForLoad: number;
        throttlingMethod: string;
        throttling: Throttling;
        auditMode: boolean;
        gatherMode: boolean;
        disableStorageReset: boolean;
        emulatedFormFactor: string;
        deviceScreenEmulationMethod: string;
        channel: string;
        budgets?: any;
        locale: string;
        blockedUrlPatterns?: any;
        additionalTraceCategories?: any;
        extraHeaders?: any;
        precomputedLanternData?: any;
        onlyAudits?: any;
        onlyCategories: string[];
        skipAudits?: any;
    }

    export interface AuditRef {
        id: string;
        weight: number;
        group: string;
    }

    export interface Performance {
        title: string;
        auditRefs: AuditRef[];
        id: string;
        score: number;
    }

    export interface AuditRef2 {
        id: string;
        weight: number;
        group: string;
    }

    export interface Accessibility {
        title: string;
        description: string;
        manualDescription: string;
        auditRefs: AuditRef2[];
        id: string;
        score: number;
    }

    export interface AuditRef3 {
        id: string;
        weight: number;
    }

    export interface BestPractices {
        title: string;
        auditRefs: AuditRef3[];
        id: string;
        score: number;
    }

    export interface AuditRef4 {
        id: string;
        weight: number;
        group: string;
    }

    export interface Seo {
        title: string;
        description: string;
        manualDescription: string;
        auditRefs: AuditRef4[];
        id: string;
        score: number;
    }

    export interface AuditRef5 {
        id: string;
        weight: number;
        group: string;
    }

    export interface Pwa {
        title: string;
        description: string;
        manualDescription: string;
        auditRefs: AuditRef5[];
        id: string;
        score: number;
    }

    export interface Categories {
        performance: Performance;
        accessibility: Accessibility;
        best
        -
        practices: BestPractices;
        seo: Seo;
        pwa: Pwa;
    }

    export interface Metrics2 {
        title: string;
    }

    export interface LoadOpportunities {
        title: string;
        description: string;
    }

    export interface Budgets {
        title: string;
        description: string;
    }

    export interface Diagnostics2 {
        title: string;
        description: string;
    }

    export interface PwaFastReliable {
        title: string;
    }

    export interface PwaInstallable {
        title: string;
    }

    export interface PwaOptimized {
        title: string;
    }

    export interface A11yBestPractices {
        title: string;
        description: string;
    }

    export interface A11yColorContrast {
        title: string;
        description: string;
    }

    export interface A11yNamesLabels {
        title: string;
        description: string;
    }

    export interface A11yNavigation {
        title: string;
        description: string;
    }

    export interface A11yAria {
        title: string;
        description: string;
    }

    export interface A11yLanguage {
        title: string;
        description: string;
    }

    export interface A11yAudioVideo {
        title: string;
        description: string;
    }

    export interface A11yTablesLists {
        title: string;
        description: string;
    }

    export interface SeoMobile {
        title: string;
        description: string;
    }

    export interface SeoContent {
        title: string;
        description: string;
    }

    export interface SeoCrawl {
        title: string;
        description: string;
    }

    export interface CategoryGroups {
        metrics: Metrics2;
        load
        -
        opportunities: LoadOpportunities;
        budgets: Budgets;
        diagnostics: Diagnostics2;
        pwa
        -
        fast
        -
        reliable: PwaFastReliable;
        pwa
        -
        installable: PwaInstallable;
        pwa
        -
        optimized: PwaOptimized;
        a11y
        -
        best
        -
        practices: A11yBestPractices;
        a11y
        -
        color
        -
        contrast: A11yColorContrast;
        a11y
        -
        names
        -
        labels: A11yNamesLabels;
        a11y
        -
        navigation: A11yNavigation;
        a11y
        -
        aria: A11yAria;
        a11y
        -
        language: A11yLanguage;
        a11y
        -
        audio
        -
        video: A11yAudioVideo;
        a11y
        -
        tables
        -
        lists: A11yTablesLists;
        seo
        -
        mobile: SeoMobile;
        seo
        -
        content: SeoContent;
        seo
        -
        crawl: SeoCrawl;
    }

    export interface Entry {
        startTime: number;
        name: string;
        duration: number;
        entryType: string;
    }

    export interface Timing {
        entries: Entry[];
        total: number;
    }

    export interface RendererFormattedStrings {
    }

    export interface Values {
        timeInMs: number;
    }

    export interface LighthouseCoreLibI18nI18nJsSeconds {
        values: Values;
        path: string;
    }

    export interface Values2 {
        timeInMs: number;
    }

    export interface LighthouseCoreLibI18nI18nJsMs {
        values: Values2;
        path: string;
    }

    export interface Values3 {
        timeInMs: number;
    }

    export interface LighthouseCoreAuditsTimeToFirstByteJsDisplayValue {
        values: Values3;
        path: string;
    }

    export interface Values4 {
        itemCount: number;
    }

    export interface LighthouseCoreAuditsCriticalRequestChainsJsDisplayValue {
        values: Values4;
        path: string;
    }

    export interface Values5 {
        requestCount: number;
        byteCount: number;
    }

    export interface LighthouseCoreAuditsResourceSummaryJsDisplayValue {
        values: Values5;
        path: string;
    }

    export interface Values6 {
        timeInMs: number;
    }

    export interface LighthouseCoreAuditsThirdPartySummaryJsDisplayValue {
        values: Values6;
        path: string;
    }

    export interface Values7 {
        itemCount: number;
    }

    export interface LighthouseCoreAuditsByteEfficiencyUsesLongCacheTtlJsDisplayValue {
        values: Values7;
        path: string;
    }

    export interface Values8 {
        totalBytes: number;
    }

    export interface LighthouseCoreAuditsByteEfficiencyTotalByteWeightJsDisplayValue {
        values: Values8;
        path: string;
    }

    export interface Values9 {
        wastedMs: number;
    }

    export interface LighthouseCoreLibI18nI18nJsDisplayValueMsSavings {
        values: Values9;
        path: string;
    }

    export interface Values10 {
        wastedBytes: number;
    }

    export interface LighthouseCoreLibI18nI18nJsDisplayValueByteSavings {
        values: Values10;
        path: string;
    }

    export interface Values11 {
        itemCount: number;
    }

    export interface LighthouseCoreAuditsDobetterwebDomSizeJsDisplayValue {
        values: Values11;
        path: string;
    }

    export interface Values12 {
        itemCount: number;
    }

    export interface LighthouseCoreAuditsDobetterwebUsesHttp2JsDisplayValue {
        values: Values12;
        path: string;
    }

    export interface IcuMessagePaths {
        [key: string]: string[];
    }

    export interface I18n {
        rendererFormattedStrings: RendererFormattedStrings;
        icuMessagePaths: IcuMessagePaths;
    }

    export interface RootObject {
        userAgent: string;
        environment: Environment;
        lighthouseVersion: string;
        fetchTime: Date;
        requestedUrl: string;
        finalUrl: string;
        runWarnings: any[];
        audits: Audits;
        configSettings: ConfigSettings;
        categories: Categories;
        categoryGroups: CategoryGroups;
        timing: Timing;
        i18n: I18n;
        stackPacks: any[];
    }

}

