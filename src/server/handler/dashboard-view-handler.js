import PAGES from '../config/sites';

/**
 *
 * @param {hapi.Request} request
 * @param {hapi.Response.Toolkit} h
 * @return {*|void}
 */
export default function dashboardViewHandler(request, h) {
    return h.view('index', { sites: PAGES });
}
