import { fetchSystemInfo } from '../../../api/system-api';
import { SET_INFO } from '../mutation-types';

/**
 *
 * @param { function } commit
 * @return { System.Info }
 */
export async function fetchInfo({ commit }) {
    const info = await fetchSystemInfo();
    commit(SET_INFO, { info });
    return info;
}
