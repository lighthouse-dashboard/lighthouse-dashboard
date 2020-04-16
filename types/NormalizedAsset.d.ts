import { Timing } from '../src/api/reports/types/Audit';

export interface NormalizedAsset {
    url: string;
    timings: Timing[];
    generatedTime: string;
    asset: string;
    _id: string;
}
