import { CREATE_SITE_URL, GET_FAV_SITES_URL, GET_SITES_URL, REMOVE_SITE_URL, GET_LATEST_AUDITED_SITES_URL } from '../../../config/routes';
import axios from '../../../utils/axios';

export async function fetchAllSites() {
    const { data } = await axios().get(GET_SITES_URL);
    return data;
}

export async function fetchFavoriteSites() {
    const { data } = await axios().get(GET_FAV_SITES_URL);
    return data;
}

export function deleteSite(_, { siteId }) {
    axios().delete(REMOVE_SITE_URL(siteId));
}

export async function createSite(_, { url, id, device }) {
    await axios()
        .post(CREATE_SITE_URL, {
            url,
            id,
            device,
        });
}

export async function getLatestSites() {
    const { data } = await axios().get(GET_LATEST_AUDITED_SITES_URL);
    return data;
}
