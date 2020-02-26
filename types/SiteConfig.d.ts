export interface SiteConfig {
    id: string;
    name: string;
    url: string;
    device: 'desktop' | 'mobile';
    order: number;
    isFavorite: boolean;
    token: string;
    last_audit: string | null;
}
