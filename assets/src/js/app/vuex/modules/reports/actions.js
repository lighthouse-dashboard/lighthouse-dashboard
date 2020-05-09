import { CREATE_REPORT_URL, GET_LATEST_REPORT_URL, GET_REPORT_URL, SPEED_OVERVIEW_URL } from '../../../config/routes';
import axios from '../../../utils/axios';

export async function fetchReportsForSite(_, { id }) {
    const { data } = await axios().get(GET_REPORT_URL(id));
    return data;
}

export function launchAuditForSite(_, { id }) {
    axios().post(CREATE_REPORT_URL(id));
}

export async function fetchReportOverview() {
    const { data } = await axios().get(SPEED_OVERVIEW_URL);
    return data;
}

export async function fetchLatestReportForSite(_, { siteId }) {
    const { data } = await axios().get(GET_LATEST_REPORT_URL(siteId));
    return data;
}
