import { SiteConfig } from './SiteConfig';

export interface QueueMessage {
    config: SiteConfig;
    message?: string | null;
}
