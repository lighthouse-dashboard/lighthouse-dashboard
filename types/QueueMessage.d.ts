import { SiteConfig } from '../src/api/sites/types/SiteConfig';

export interface QueueMessage {
    config: SiteConfig;
    message?: string | null;
}
