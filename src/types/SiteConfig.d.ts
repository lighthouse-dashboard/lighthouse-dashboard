export interface SiteConfig {
    id: string;
    url: string;
    device: 'desktop' | 'mobile';
    order: number;
    is_favorite: boolean;
    token: string;
    last_audit: string | null;
}
