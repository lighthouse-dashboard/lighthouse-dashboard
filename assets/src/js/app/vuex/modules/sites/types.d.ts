import { Sites } from '../../../../../../../src/api/sites/types';

export interface SitesState {
    favoritedSits: Sites.SiteConfig[];
    sites: Sites.SiteConfig[];
    searchResult: Sites.SiteConfig[];
    currentSiteConfig: Sites.SiteConfig;
}
