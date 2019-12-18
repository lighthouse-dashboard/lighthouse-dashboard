import { Timing } from './Audit';

export interface NormalizedAsset {
    url: string;
    timings: Timing[];
    generatedTime: string;
    asset: string;
}
