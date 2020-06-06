import { SET_INFO } from '../mutation-types';

export default {
    /**
     *
     * @param { SystemState } state
     * @param { System.Info } info
     */
    [SET_INFO](state, { info }) {
        state.info = info;
    },
};
